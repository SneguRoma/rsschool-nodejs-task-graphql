import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from "graphql";
import { UUIDType } from "../types/uuid.js";
import { MemberTypeIdFromRest } from "../types/memberType.js";

export const CreateProfileInput = new GraphQLInputObjectType ({
    name: 'CreateProfileInput',
    fields: () => ({
        userId: { type: UUIDType },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeIdFromRest },
      }),
});

export const ChangeProfileInput = new GraphQLInputObjectType ({
    name: 'ChangeProfileInput',
    fields: () => ({
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeIdFromRest },
      }),
});