
import { GraphQLBoolean, GraphQLInt, GraphQLObjectType} from 'graphql';
import { UUIDType } from './uuid.js';

import { Context } from '../types/context.js';
import { Profile } from '@prisma/client';
import { MemberType, MemberTypeIdFromRest } from './memberType.js';
import { UserType } from './userType.js';


export const ProfileType = new GraphQLObjectType({
    name: 'ProfileType',
    fields: () => ({
      id: { type: UUIDType },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      userId: { type: UUIDType },
      user: {
        type: UserType as GraphQLObjectType,
        resolve: async (parent: Profile, __: unknown, { prisma }: Context) => {
          return await prisma.user.findFirst({ where: { id: parent.userId } });
        },
      },
      memberTypeId: { type: MemberTypeIdFromRest },
      memberType: {
        type: MemberType,
        resolve: async (parent: Profile, __: unknown, { prisma }: Context) => {
          return await prisma.memberType.findFirst({ where: { id: parent.memberTypeId } });
        },
      },
    }),
  });