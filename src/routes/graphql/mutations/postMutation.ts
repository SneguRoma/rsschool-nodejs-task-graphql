import { Context } from "../types/context.js";
import { UUIDType } from "../types/uuid.js";
import { ChangePostInput, CreatePostInput } from "../inputs/postInput.js";
import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { PostType } from "../types/postType.js";

export interface CreatePost {
    dto: {
      title: string;
      content: string;
      authorId: string;
    };
  }

export interface ChangePost {
    id: string,
    dto: {
      title: string;
      content: string;
    };
  }

export const PostMutation = {
    createPost: {
        type: PostType as GraphQLObjectType,
        args: {
            dto: {type: CreatePostInput},
        },
        resolve: async (_parent: unknown, {dto}: CreatePost, {prisma}: Context) => {
          return await prisma.post.create({ data: dto})
        }
    },
    changePost: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type:ChangePostInput} },
      resolve: async (__: unknown, {id, dto}:ChangePost, { prisma }: Context) =>{

          return await prisma.post.update({ where: { id }, data: dto })
      },
    },
    deletePost: {
      type: UUIDType,
      args: {id: {type: UUIDType }},
      resolve: async (__: unknown, {id}:{id:string},{ prisma }: Context) =>{
        try {
            await prisma.post.delete({ where: { id } });
          } catch {
            return false;
          }
          return true;
        
      },
    }
};