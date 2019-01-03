const users = [
    {
        id: 'abc123',
        name: 'Steve',
        email: 'xyz@gmail.com',
        age: 48
    },
    {
        id: 'abc456',
        name: 'George',
        email: 'abc@gmail.com',
        age: 84
    },
    {
        id: 'abc789',
        name: 'Peter',
        email: 'mno@gmail.com',
        age: 24
    }
];

const posts = [
    {
        id: 'fdfds',
        title: 'Nodemon Sucks',
        body: 'Failed attempts to get nodemon to work on Mac.  Damn you, nodemon!',
        published: true,
        author: 'abc123'
    },
    {
        id: 'fdfdt',
        title: 'To hell with nodemon',
        body: `You can't squeeze blood out of a turnip!`,
        published: false,
        author: 'abc456'
    },
    {
        id: 'fdfdu',
        title: 'Lies I tell myself',
        body: 'Hey, it actually worked....not',
        published: true,
        author: 'abc123'
    }
];

const comments = [
    {
        id: 'xxyy11',
        text: 'My first comment',
        author: 'abc123',
        post: 'fdfds'
    },
    {
        id: 'xxyy22',
        text: 'My second comment',
        author: 'abc456',
        post: 'fdfds'
    },
    {
        id: 'xxyy33',
        text: 'My third comment',
        author: 'abc123',
        post: 'fdfdt'
    },
    {
        id: 'xxyy44',
        text: 'My fourth comment',
        author: 'abc456',
        post: 'fdfdt'
    }
];

const db = {
    users,
    posts,
    comments
}

export {db as default};