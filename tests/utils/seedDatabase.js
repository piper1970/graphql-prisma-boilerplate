import bcrypt from 'bcryptjs';
import prisma from '../../src/prisma';
import jwt from 'jsonwebtoken';

const userOne = {
    input: {
        name:'Testy',
        email: 'testy@testy.com',
        password:bcrypt.hashSync('testytesty')
    },
    user:undefined,
    jwt: undefined
};

const userTwo = {
    input: {
        name:'Pasty',
        email: 'pasty@testy.com',
        password:bcrypt.hashSync('pastypasty')
    },
    user:undefined,
    jwt: undefined
};



// seed database
const seedDatabase = async () => {

    // clean the users database
    await prisma.mutation.deleteManyUsers();

    // create test user1
    userOne.user = await prisma.mutation.createUser({
        data:userOne.input
    });
    userOne.jwt = jwt.sign({userId: userOne.user.id}, process.env.JWT_SECRET);

    // create testuser2
    userTwo.user = await prisma.mutation.createUser({
        data:userTwo.input
    });
    userTwo.jwt = jwt.sign({userId: userTwo.user.id}, process.env.JWT_SECRET);
};

export {seedDatabase as default, userOne, userTwo};