import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, {userOne, postOne, commentOne, commentTwo} from './utils/seedDatabase';
import getClient from './utils/getClient';
import {deleteComment, subscribeToComments} from './utils/operations';

describe('comments', () => {

    beforeEach(async () => {
        jest.setTimeout(15000);
        await seedDatabase();
    });

    describe('deleteComment', () => {

        it('should delete own comment', async() => {
            const client = getClient(userOne.jwt);
            const variables = {
                id: `${commentTwo.comment.id}`
            };

            await client.mutate({mutation:deleteComment, variables});
            const stillExists = await prisma.exists.Comment({
                id: commentTwo.comment.id
            });

            expect(stillExists).toBeFalsy();
        });

        it('should not delete other users comment', async() => {
            const variables = {
                id: `${commentOne.comment.id}`
            };
            const client = getClient(userOne.jwt);
            await expect(
                client.mutate({mutation:deleteComment, variables})
                ).rejects.toThrow();
            
            const stillExists = await prisma.exists.Comment({
                id: commentOne.comment.id
            });

            expect(stillExists).toBeTruthy();
        });
    });

    describe('subscriptions', () => {
        it('should subscribe to comments for a post', async (done) => {
            const variables = {
                postId: postOne.post.id
            };
            const client = getClient(userOne.jwt);
            client.subscribe({query: subscribeToComments, variables}).subscribe({
                next({data}){
                    expect(data.comment.mutation).toBe("DELETED");
                    done();
                } 
            });

            // Change a comment
            await prisma.mutation.deleteComment({where: {id: commentOne.comment.id}});
        })
    })
});