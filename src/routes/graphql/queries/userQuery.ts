import { UserType } from '../types/userType.js';
import { Context } from '../types/context.js';
import { UUIDType } from '../types/uuid.js';
import { User } from '@prisma/client';
import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';

export const userQuery = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id:{ type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (_: unknown, { id }: User, { prisma }: Context) =>    {
        const userType = await prisma.user.findFirst({
          where: {
            id: id,
          },
        });
        return userType;
      }
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (_parent, _args, { prisma }: Context) => {
      return await prisma.user.findMany();
    }
}  
};