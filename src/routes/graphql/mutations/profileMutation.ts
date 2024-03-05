import {  GraphQLObjectType } from "graphql";
import { Context } from "../types/context.js";
import { UUIDType } from "../types/uuid.js";
import { ProfileType } from "../types/profilType.js";
import { CreateProfileInput, ChangeProfileInput } from "../inputs/profileInput.js";

export interface CreateProfile {
    dto: {
      isMale: boolean;
      yearOfBirth: number;
      memberTypeId: string;
      userId: string;
    };
  }

export interface ChangeProfile {
    id: string,
    dto: {
        isMale: boolean;
        yearOfBirth: number;
        memberTypeId: string;
    };
}

export const ProfileMutation = {
    createProfile: {
        type: ProfileType as GraphQLObjectType,
        args: {
            dto: { type: CreateProfileInput}
        },
        resolve: async (_parent: unknown, {dto}: CreateProfile, {prisma}: Context )=>{

           return await prisma.profile.create({data: dto});
        }
    },
    changeProfile: {
        type: ProfileType as GraphQLObjectType,
        args: {
            id: { type: UUIDType},
            dto: {type: ChangeProfileInput}
        },
        resolve: async (_parent: unknown, {id, dto}:{id: string, dto:ChangeProfile}, {prisma}: Context) =>
            await prisma.profile.update({ where: { id }, data: dto }),
    },
    deleteProfile: {
        type: UUIDType,
        args: {id: {type:UUIDType }},
        resolve: async (_parent: unknown, {id}:{id:string},{ prisma }: Context) =>{           
              await prisma.profile.delete({ where: { id } });
              return id;
  
        },
    }

}