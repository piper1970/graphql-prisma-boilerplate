import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const generateToken = userId => {
    return jwt.sign({userId}, secret, {
        expiresIn: '1 hour'
    });
};

export {generateToken as default};