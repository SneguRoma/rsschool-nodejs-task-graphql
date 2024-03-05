import  { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { User } from '@prisma/client';
import { Context } from '../types/context.js';
import { ProfileType } from './profilType.js';
import { PostType } from './postType.js';



export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
      id: { type: UUIDType },
      name: { type: GraphQLString },
      balance: { type: GraphQLFloat },
      profile: {
        type: ProfileType,
        resolve: async (parent: User, __: unknown, { prisma }: Context) => {
          return await prisma.profile.findFirst({ where: { userId: parent.id } });
        },
      },
      posts: {
        type: new GraphQLList(PostType),
        resolve: async (parent: User, __: unknown, { prisma }: Context) => {
          return await prisma.post.findMany({ where: { authorId: parent.id } });
        },
      },
      userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: async (parent: User, __: unknown, { prisma }: Context) => {
          console.log('parentId:', parent);
          return await prisma.user.findMany({
            where: {
              subscribedToUser: {
                some: {
                  subscriberId: parent.id,
                },
              },
            },
          });
        },
      },
      subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: async (parent: User, __: unknown, { prisma }: Context) => {
          return await prisma.user.findMany({
            where: {
              userSubscribedTo: {
                some: {
                  authorId: parent.id,
                },
              },
            },
          });
        },
      },
    }),
  });