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
}

const postOne = {
    input: {
        title:'Post 1',
        body: 'Body 1',
        published: true,
    },
    post:undefined
};

const postTwo = {
    input:{
        title:'Post 2',
        body: 'Body 2',
        published: false,
    },
    post:undefined
};

const commentOne = {
    input: {
        text:'Comment 1 text',
        author:undefined,
        post: undefined
    },
    comment: undefined
};

const commentTwo = {
    input: {
        text:'Comment 2 text',
        author:undefined,
        post: undefined
    },
    comment: undefined
};

// seed database
const seedDatabase = async () => {
    // clean comments
    await prisma.mutation.deleteManyComments();

    // clean posts database
    await prisma.mutation.deleteManyPosts();

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

    // create dummy published postOne
    postOne.post = await prisma.mutation.createPost({
        data:{
            ...postOne.input,
            author:{
                connect:{
                    id: userOne.user.id
                }
            }
        }
    });

    // create dummy unpublished post
    postTwo.post = await prisma.mutation.createPost({
        data:{
            ...postTwo.input,
            author:{
                connect:{
                    id: userOne.user.id
                }
            }
        }
    });

    // Adjust input and create comments
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            },
            post: {
                connect:{
                    id: postOne.post.id
                }
            }
        }
    });

    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    });
};

export {seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo};