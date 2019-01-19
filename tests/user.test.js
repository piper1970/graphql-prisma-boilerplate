import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, {userOne} from './utils/seedDatabase';
import getClient from './utils/getClient';
import {createUser, login, getProfile, getUsers} from './utils/operations';

describe('users', () => {

    beforeEach(async () => {
        jest.setTimeout(15000);
        await seedDatabase();
    });

    describe('unauthenticated', () => {

        let client;
        beforeEach(() => {
            client = getClient();
        });

        describe('createUser', () => {

            it('should create a new user', async () => {
                const variables = {
                    data: {
                        name: 'Jorge Montoya',
                        email: 'whatever@whatever.com',
                        password:'12345678'
                    }
                };
        
                const response = await client.mutate({
                    mutation:createUser,
                    variables
                });
        
                const userExists = await prisma.exists.User({
                    id: response.data.createUser.user.id
                });
        
                expect(userExists).toBeTruthy();
            });
    
            it('should not create user with password smaller than 8 characters', async() => {
                const variables = {
                    data: {
                        name: 'testy27',
                        email: 'testy27@testy.com',
                        password:'testyt'
                    }
                };
    
                await expect(
                    client.mutate({mutation:createUser, variables})
                    ).rejects.toThrow();
            });
    
        });
    
        describe('login', () => {
    
            it('should not login with bad email', async() => {
    
                const variables = {
                    data: {
                        email: 'wrong@wrong.com',
                        password:'testytesty'
                    }
                };
        
                await expect(
                    client.mutate({mutation:login, variables})
                    ).rejects.toThrow();
            });
    
            it('should not login with bad password', async() => {
                const variables = {
                    data: {
                        email: 'testy@testy.com',
                        password:'wrongpassword'
                    }
                };
        
                await expect(
                    client.mutate({mutation:login, variables})
                    ).rejects.toThrow();
            })
    
        });
    
        describe('query users', () => {
    
            it('should expose public author profiles', async () => {
                const response = await client.query({query:getUsers});
        
                expect(response.data.users.length).toBe(2);
                expect(response.data.users[0].email).toBe(null);
                expect(response.data.users[0].name).toBe('Testy');
            });
    
        });
    });

    describe('authenticated user', () => {

        let client;
        beforeEach(() => {
            client = getClient(userOne.jwt);
        });

        it('should fetch user profile', async () => {
            const {data} = await client.query({query:getProfile});

            expect(data.me.id).toBe(userOne.user.id);
            expect(data.me.name).toBe(userOne.user.name);
            expect(data.me.email).toBe(userOne.user.email);
        });
    });
});
