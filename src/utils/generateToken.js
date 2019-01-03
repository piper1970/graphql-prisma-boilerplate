import jwt from 'jsonwebtoken';

const generateToken = userId => {
    return jwt.sign({userId}, 'someSecret', {
        expiresIn: '1 hour'
    });
};

export {generateToken as default};