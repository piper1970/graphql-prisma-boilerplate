import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, {userOne, postOne, postTwo} from './utils/seedDatabase';
import getClient from './utils/getClient';
import {queryPosts, myPosts, updatePost,createPost,deletePost, subscribeToPosts} from './utils/operations';

describe('posts', () => {

    beforeEach(async () => {
        jest.setTimeout(15000);
        await seedDatabase();
    });

    describe('unauthenticated', () => {

        let client;
        beforeEach(() => {
            client = getClient();
        });

        describe('query posts', () => {
            it('should only expose published posts', async () => {

                const response = await client.query({query:queryPosts});

                expect(response.data.posts.length).toBe(1);
                expect(response.data.posts[0].published).toBeTruthy();
                expect(response.data.posts[0].title).toBe('Post 1');
            });

        });
        
    });

    describe('authenticated posts', () => {

        let client;
        beforeEach(() => {
            client = getClient(userOne.jwt);
        });

        describe('myPosts', () => {
            it('should return all my posts', async () => {

                const {data} = await client.query({query:myPosts});

                expect(data.myPosts.length).toBe(2);            
            });
        });

        describe('update posts', () => {
            it('should be able to update own post', async () => {

                const variables = {
                    id: `${postOne.post.id}`,
                    data: {
                        published: false
                    }
                };
                const {data} = await client.mutate({mutation:updatePost, variables});
                const exists = await prisma.exists.Post({
                    id: postOne.post.id,
                    published: false
                });

                expect(data.updatePost.published).toBeFalsy();
                expect(exists).toBeTruthy();
            });
        });

        describe('createPost', () => {
            it('should successfully create a post', async () => {
                const variables = {
                    data:{
                        title: 'My test created post',
                        body: 'This is the body of the post',
                        published: true
                    }
                };

                const {data} = await client.mutate({mutation:createPost, variables});
                const postExists = await prisma.exists.Post({
                    id: data.createPost.id,
                    title: data.createPost.title,
                    body: data.createPost.body,
                    published: data.createPost.published
                });

                expect(data.createPost.title).toBe('My test created post');
                expect(data.createPost.body).toBe('This is the body of the post');
                expect(data.createPost.published).toBeTruthy();
                expect(postExists).toBeTruthy();
            });
        });

        describe('deletePost', () => {
            it('should successfully delete a post', async () => {
                const variables = {
                    id: `${postTwo.post.id}`
                };

                const {data} = await client.mutate({mutation:deletePost, variables});
                const stillExists = await prisma.exists.Post({
                    id: postTwo.post.id
                });

                expect(data.deletePost.id).toBe(postTwo.post.id);
                expect(stillExists).toBeFalsy();
            });
        });

        describe('subcribeToPost', () => {
            it('should recognize changes to posts', async (done) => {
                client.subscribe({query: subscribeToPosts}).subscribe({
                    next({data}){
                        expect(data.post.mutation).toBe("UPDATED");
                        expect(data.post.node.published).toBeTruthy();
                        expect(data.post.node.id).toBe(postTwo.post.id);
                        done();
                    } 
                });

                await prisma.mutation.updatePost({data:{published: true},where:{id: postTwo.post.id}})
            })
        });
    });
});