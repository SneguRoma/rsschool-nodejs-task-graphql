import {  GraphQLObjectType } from "graphql";
import { Context } from "../types/context.js";
import { UUIDType } from '../types/uuid.js';
import { UserType } from "../types/userType.js";
import { ChangeUserInput, CreateUserInput } from "../inputs/userInput.js";

export interface CreateUser {
    dto: {
      name: string;
      balance: number;
    };
  }
  export interface ChangeUser {
    id: string,
    dto: {
      name: string;
      balance: number;
    };
  }

export const UserMutation = {
    createUser: {
        type: UserType as GraphQLObjectType,
        args: {
            dto: {type: CreateUserInput},
        },
        resolve: async (_parent: unknown, {dto}: CreateUser, {prisma}: Context) => {
          return await prisma.user.create({data: dto})
        }
    },

    changeUser: {
        type: UserType as GraphQLObjectType,
        args: {
            id: {type:UUIDType},
            dto: {type: ChangeUserInput},
        },
        resolve: async (_parent: unknown, {id, dto}:{ id: string, dto: ChangeUser }, { prisma }: Context) => 
            {
              return await prisma.user.update({where: {id}, data: dto})
            }
    },

    deleteUser:  {
        type: UUIDType,
        args:{
            id: {type: UUIDType},
        },
        resolve: async (__: unknown, { id }: { id: string }, { prisma }: Context) => {
          try {
            await prisma.user.delete({ where: { id } });
          } catch {
            return false;
          }
          return true;        
        }
    },
    subscribeTo: {
        type: UserType as GraphQLObjectType,
        args: {
          userId: { type: UUIDType },
          authorId: { type: UUIDType },
        },
        resolve: async (
          _parent: unknown,
          args: { userId: string; authorId: string },
          { prisma }: Context,
        ) => {
          await prisma.subscribersOnAuthors.create({
            data: { subscriberId: args.userId, authorId: args.authorId },
          });  
          return await prisma.user.findUnique({ where: { id: args.userId } });          
        },
      },
    unsubscribeFrom: {
        type: UUIDType,
        args: {
          userId: { type: UUIDType },
          authorId: { type: UUIDType },
        },
        resolve: async (
          _parent: unknown,
          args: { userId: string; authorId: string },
          { prisma }: Context,
        ) => {
          try {
            await prisma.subscribersOnAuthors.delete({
              where: {
                subscriberId_authorId: {
                  subscriberId: args.userId,
                  authorId: args.authorId,
                },
              },
            });
          } catch {
            return false;
          }
          return true;
        },
    }
};