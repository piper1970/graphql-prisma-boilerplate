import getUserId from '../utils/getUserId';
import { openSync } from 'fs';

const Query = {
    me(parent, args, {prisma,request}, info){
        const userId = getUserId(request);
        return prisma.query.user({where:{
            id: userId
        }}, info);
    },
    async post(parent, {id}, {prisma,request}, info){

        // this is broken...
        const userId = getUserId(request, false);

        const posts = await prisma.query.posts({
            where:{
                id,
                OR: [
                    {
                        published: true
                    },
                    {
                        id: userId
                    }
                ]
            }
        }, info);

        if(posts.length === 0) {
            throw new Error('Post not found');
        }

        return posts[0];
    },
    users(parent, args, {prisma}, info){

        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        };

        if(args.query){
            opArgs.where = {
                name_contains: args.query 
            }
        }

        return prisma.query.users(opArgs, info);
    },
    myPosts(parent,args,{prisma, request},info){
        const userId = getUserId(request);
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        };

        if(!args.query){
            opArgs.where = {
                author:{
                    id: userId
                }
            }
        }else{
            opArgs.where = {
                AND: [
                    {
                        author:{
                            id: userId
                        }
                    },
                    {
                        OR: [
                            {
                                title_contains: args.query
                            },
                            {
                                body_contains: args.query
                            }
                        ]
                    }
                ]
            };
        }

        return prisma.query.posts(opArgs, info);
    },
    posts(parent,args,{prisma},info){
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        };

        if(args.query){
            opArgs.where.OR = [
                {
                    title_contains: args.query
                },
                {
                    body_contains: args.query
                }
            ];
        }

        return prisma.query.posts(opArgs, info);
    },
    comments(parent,args,{prisma},info){
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        };
        return prisma.query.comments(opArgs, info);
    }
};
export {Query as default};