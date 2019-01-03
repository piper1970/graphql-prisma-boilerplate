import getUserId from '../utils/getUserId';
const User = {
    email: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, {request}, info){
            const userId = getUserId(request, false);
            if(userId && userId === parent.id){
                return parent.email;
            }
            return null;
        }
    },
    posts: {
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, {prisma}, info){
            const opArgs = {
                where: {
                    AND: [{
                        author:{
                            id: parent.id
                        }
                    },
                    {
                        published: true
                    }]
                }
            };
            return prisma.query.posts(opArgs, info)
        }
    }
};
export {User as default};