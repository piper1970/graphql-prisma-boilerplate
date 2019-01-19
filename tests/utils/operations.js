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

export {login, getProfile, getUsers, createUser};


