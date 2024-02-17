import prisma from "../database/db";
import {Prisma} from "@prisma/client";

const collection = prisma.user;

export async function create(userData: Prisma.UserCreateInput) {
  return collection.create({
    data: userData,
  })
}

export async function list() {
  return collection.findMany()
}

export async function getUserPosts(id: string) {
  return collection
    .findUnique({
      where: {
        id: Number(id),
      },
    })
    .posts({
      where: {published: false},
    })
}
