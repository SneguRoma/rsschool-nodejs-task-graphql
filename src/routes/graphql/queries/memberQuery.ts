import { GraphQLList, GraphQLObjectType } from 'graphql';
import { Context } from '../types/context.js';
import { MemberType as PrismaMemberType } from '@prisma/client';
import { MemberType, MemberTypeIdFromRest } from '../types/memberType.js';


export const memberQuery = {
  memberType: {
    type: MemberType as GraphQLObjectType,
    args: {
      id: { type: MemberTypeIdFromRest },
    },
    resolve: async (__: unknown, args: PrismaMemberType, { prisma }: Context) => {      
        return  await prisma.memberType.findUnique({ where: { id: args.id } });
       
    },
  },

  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (_parent: unknown, _: unknown, { prisma }: Context) => {
        return await prisma.memberType.findMany();       
    },
  },
};


