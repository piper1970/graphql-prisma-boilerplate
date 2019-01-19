import { gql }from 'apollo-boost';

const getProfile = gql`
    query{
        me{
            id
            name
            email
        }
    }
`;

const getUsers = gql`
    query{
        users{
            id
            email
            name
        }
    }
`;

const createUser = gql`
    mutation($data:CreateUserInput!){
        createUser(
            data: $data
        ){
            token,
            user{
                id
                name
                email
            }
        }
    }
`;

const login = gql`
    mutation($data:LoginInput!){
        loginUser(
            data:$data
        ){
            token
        }    
    }
`;

const queryPosts = gql`
    query{
        posts{
            title
            published
        }
    }
`;

const myPosts = gql`
    query{
        myPosts{
            id
            title
            body
            published
        }
    }
`;

const updatePost = gql`
    mutation($id:ID!, $data:UpdatePostInput!) {
        updatePost(
            id:$id,
            data:$data
        ){
            id
            title
            body
            published
        }
    }
`;

const createPost = gql`
    mutation($data:CreatePostInput!){
        createPost(data: $data){
            id
            title
            body
            published
        }
    }
`;

const deletePost = gql`
    mutation($id:ID!){
        deletePost(
            id: $id
        ){
            id
        }
    }
`;

const deleteComment = gql`
    mutation($id:ID!){
        deleteComment(
            id: $id
        ){
            id
        }
    }
`;

const subscribeToComments = gql`
    subscription($postId: ID!){
        comment(postId: $postId){
            mutation,
            node {
                id,
                text
            }
        }
    }
`;

const subscribeToPosts = gql`
    subscription{
        post{
            mutation,
            node {
                id,
                title,
                body,
                published
            }
        }
    }
`;

export {login, getProfile, getUsers, createUser, queryPosts, myPosts, updatePost, createPost, deletePost, deleteComment, subscribeToComments, subscribeToPosts};


