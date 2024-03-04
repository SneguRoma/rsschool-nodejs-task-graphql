import { PrismaClient, User } from '@prisma/client';

export interface Subscription {
  subscriberId: string;
  authorId: string;
}

export interface ExtendedUser extends User {
  id: string;
  subscriptions?: Subscription[];
  subscribedTo?: Subscription[];
}

export interface Context {
  prisma: PrismaClient;
  dataUsers?: ExtendedUser[];
}
