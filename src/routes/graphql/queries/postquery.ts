import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PostType } from '../types/postType.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';

export const getPost = {
    post: {
        type: PostType as GraphQLObjectType,
        args: { id: { type: UUIDType } },
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