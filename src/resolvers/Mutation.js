import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
    async loginUser(parent, {data}, {prisma}, info){
        const user = await prisma.query.user({
            where:{
                email:data.email
            }
        });

        if(!user){
            throw new Error('email/password invalid');
        }

        const isEmailValid = await bcrypt.compare(data.password, user.password);  
        if(!isEmailValid){
            throw new Error('email/password invalid');
        }

        return {
            user,
            token: generateToken(user.id)
        }
    },
    async createUser(parent,{data},{prisma},info){
        const password = await hashPassword(data.password);
        const newUser = {...data, password};
        const user = prisma.mutation.createUser({
            data: newUser
        });

        return {
            user,
            token: generateToken(user.id)
        }
    },
    deleteUser(parent,args,{prisma, request},info){
        const id = getUserId(request);
        const opArgs = {
            where: {
                id
            }
        };
        return prisma.mutation.deleteUser(opArgs, info);
    },
    async updateUser(parent,{data},{prisma, request},info){
        if(typeof data.password === 'string'){
            data.password = await hashPassword(data.password);
        }
        const id = getUserId(request);
        const opArg = {
            where: {
                id
            },
            data
        };
        return prisma.mutation.updateUser(opArg, info);
    },
    createPost(parent,{data},{prisma, request},info){
        const userId = getUserId(request);

        return prisma.mutation.createPost({
            data:{
                title: data.title,
                body: data.body,
                published: data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info);
    },
    async deletePost(parent,{id},{prisma,request},info){
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId
            }
        });

        if(!postExists){
            throw new Error('Unable to delete post');
        }
        const opArgs = {
            where: {
                id
            }
        };
        return prisma.mutation.deletePost(opArgs, info);
    },
    async updatePost(parent,{id, data},{prisma, request},info){
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
            id,
            author: {
                id: userId
            }
        });

        if(!postExists){
            throw new Error('Unable to update post');
        }

        const isPublished = await prisma.exists.Post({
            id,
            author: {
                id: userId
            },
            published: true
        })

        // optionally delete all comments if post is being 'un-published'
        if(isPublished && typeof data.published === 'boolean' && !data.published){
            const numberDeleted = await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id
                    }
                }
            });
        }
        const opArg = {
            where: {
                id
            },
            data
        };
        return prisma.mutation.updatePost(opArg, info);
    },
    async createComment(parent,{data},{prisma,request},info){
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
            id: data.post,
            published: true
        });

        if(!postExists){
            throw new Error('Post not available for commenting');
        }

        return prisma.mutation.createComment({
            data: {
                text: data.text,
                author: {
                    connect: {
                        id: userId
                    }
                },
                post: {
                    connect: {
                        id: data.post
                    }
                }
            }
        }, info);
    },
    async deleteComment(parent,{id, data},{prisma, request},info){
        const userID = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userID
            }
        });
        if(!commentExists){
            throw new Error('Could not delete comment');
        }
        const opArgs = {
            where: {
                id
            }
        };
        return prisma.mutation.deleteComment(opArgs, info);
    },
    async updateComment(parent,{id, data},{prisma,request},info){
        const userID = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id,
            author: {
                id: userID
            }
        });
        if(!commentExists){
            throw new Error('Could not update comment');
        }
        const opArg = {
            where: {
                id
            },
            data
        };
        return prisma.mutation.updateComment(opArg, info);
    }
};
export {Mutation as default};