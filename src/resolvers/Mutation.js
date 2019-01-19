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
        const user = await prisma.mutation.createUser({
            data: newUser
        });

        return {
            user,
            token: generateToken(user.id)
        }
    },
    deleteUser(parent,args,{prisma, request},info){
        const userId = getUserId(request);
        const opArgs = {
            where: {
                id:userId
            }
        };
        return prisma.mutation.deleteUser(opArgs, info);
    },
    async updateUser(parent,{data},{prisma, request},info){
        if(typeof data.password === 'string'){
            data.password = await hashPassword(data.password);
        }
        const userId = getUserId(request);
        const opArg = {
            where: {
                id:userId
            },
            data
        };
        return prisma.mutation.updateUser(opArg, info);
    }
};
export {Mutation as default};