import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { PostMutation } from './mutations/postMutation.js';
import { ProfileMutation } from './mutations/profileMutation.js';
import { UserMutation } from './mutations/userMutation.js';
import {  memberQuery } from './queries/memberQuery.js';
import {  postQuery } from './queries/postquery.js';
import { profileQuery } from './queries/profilQuery.js';
import { userQuery } from './queries/userQuery.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...userQuery,
    ...memberQuery,
    ...postQuery,
    ...profileQuery,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...UserMutation,
    ...PostMutation,
    ...ProfileMutation,
  },
});


export const createGraphQLRequestSchema = new GraphQLSchema({ query, mutation });


