import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';
import { Profile } from '@prisma/client';
import { ProfileType } from '../types/profilType.js';


export const profileQuery = {

    profile: {
        type: ProfileType as GraphQLObjectType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async (_: unknown, { id }: Profile, { prisma }: Context) => {
          const profileType = await prisma.profile.findFirst({
            where: {
              id,
            },
          });
          return profileType;
        },
      },
      
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (_: unknown, _args: unknown,  { prisma }: Context) => {
          return await prisma.profile.findMany();
        }  
  },
};