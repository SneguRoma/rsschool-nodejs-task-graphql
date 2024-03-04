import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from '../types/postType.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';

export const postQuery = {
    post: {
        type: PostType as GraphQLObjectType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (__: unknown, { id }: {id:string}, { prisma }: Context) => {
          const postType = await prisma.post.findFirst({
            where: {
              id
            },
          });
          return postType;
        },
      },  

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (_parent: unknown, _args: unknown, { prisma }: Context) => {
      const posts = await prisma.post.findMany();
      return posts;
    },
  },
};