import {Prisma} from 'prisma-binding';
import {fragmentReplacements} from './resolvers/index';
const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret:'overdrive5reshipments',
    fragmentReplacements
});

export {prisma as default}

// const createPostForUser = async (authorID, data) => {
//     const userExists = await prisma.exists.User({
//         id: authorID
//     });
//     if(!userExists){
//         throw new Error("User not found");
//     }
//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author:{
//                 connect:{
//                     id: authorID
//                 }
//             }
//         }
//     }, '{author {id name email posts {id title body published}}}');
    
//     return post.author;
// };

// const updatePostForUser = async (postID, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postID
//     });

//     if(!postExists){
//         throw new Error('Post not found');
//     }
//     const post = await prisma.mutation.updatePost({
//         where:{
//             id: postID
//         },
//         data
//     }, '{author {id name email posts {id title body published}}}');

//     return post.author;
// };

// updatePostForUser("cjpbksi3j004e0a91yh1g96fu", {
//     title: "What Daffy Duck would say",
//     body: "That's dispicable!",
//     published:false
// })
// .then(user => console.log(JSON.stringify(user, undefined, 2)))
// .catch(error => console.log(error.message));

// // createPostForUser("cjp5uq2uc002r0a912cx1j9nd", {
// //     title: "What Scooby would say",
// //     body: "Scooby Snacks!?",
// //     published: false
// // }).then(data => {
// //     console.log(JSON.stringify(data, undefined, 2));
// // }).catch(error => {
// //     console.log(error.message)
// // });





// prisma.query.posts(null, '{id title body published author {id name}}')
// .then(data => console.log(JSON.stringify(data, undefined, 2)));


// prisma.mutation.updatePost({
//     data:{
//         published:true,
//         body:"And now we begin"
//     },
//     where:{
//         id: "cjpbjzgf8003s0a91tsa9hwid"
//     }
// })
// .then(_ignored => {
//     return prisma.query.posts(null, '{id title body published}')
// })
// .then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.subscription
// prisma.exists