import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const getUserId = (request, requireAuth=true) => {
    const header = request.request? request.request.headers.authorization: request.connection.context.Authorization;
    if(header){
        const token = header.replace('Bearer ', '');
        const verified = jwt.verify(token, secret);
        return verified.userId;
    }
    if(requireAuth){
        throw new Error('Authentication required');
    }

    return null;
};

export {getUserId as default};