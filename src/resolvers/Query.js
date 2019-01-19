import getUserId from '../utils/getUserId';
import { openSync } from 'fs';

const Query = {
    me(parent, args, {prisma,request}, info){
        const userId = getUserId(request);
        return prisma.query.user({where:{
            id: userId
        }}, info);
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
    }
};
export {Query as default};