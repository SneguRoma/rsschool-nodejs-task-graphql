import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { Context } from '../types/context.js';
import { MemberType as MemType } from '@prisma/client';
import { MemberTypeId } from '../../member-types/schemas.js';
import { ProfileType } from './profilType.js';

export const MemberTypeIdFromRest = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
      basic: { value: MemberTypeId.BASIC },
      business: { value: MemberTypeId.BUSINESS },
    },
  });

 


export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: MemberTypeIdFromRest },
      discount: { type: GraphQLFloat },
      postsLimitPerMonth: { type: GraphQLInt },
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (parent: MemType, __: unknown, { prisma }: Context) => {
            
          return await prisma.profile.findMany({ where: { memberTypeId: parent.id } });
        },
      },
    }),
  });