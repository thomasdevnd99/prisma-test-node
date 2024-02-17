import prisma from "../database/db";
import {Prisma} from "@prisma/client";

const collection = prisma.post

export async function create(data: any) {
  const {title, content, authorEmail} = data

  return collection.create({
    data: {
      title,
      content,
      author: {connect: {email: authorEmail}},
    },
  })
}

// @ts-ignore
export async function list({searchString, skip, take, orderBy} = {}) {
  const or: Prisma.PostWhereInput = searchString
    ? {
      OR: [
        {title: {contains: searchString as string}},
        {content: {contains: searchString as string}},
      ],
    }
    : {}

  return collection.findMany({
    where: {
      published: true,
      ...or,
    },
    include: {author: true},
    take: Number(take) || undefined,
    skip: Number(skip) || undefined,
    orderBy: {
      updatedAt: orderBy as Prisma.SortOrder,
    },
  })
}

/**
 *
 * @param id
 * @param times
 */
export async function viewPost(id: string, times = 1) {
  return collection.update({
    where: {id: Number(id)},
    data: {
      viewCount: {
        increment: times,
      },
    },
  })
}

/**
 *
 * @param id
 */
export async function publish(id: string) {
  const postData = await collection.findUnique({
    where: {id: Number(id)},
    select: {
      published: true,
    },
  })

  return collection.update({
    where: {id: Number(id) || undefined},
    data: {published: !postData?.published},
  })
}

export async function remove(id: string) {
  return collection.delete({
    where: {
      id: Number(id),
    },
  })
}

export async function getOne(id: string) {
  return collection.findUnique({
    where: {id: Number(id)},
  })
}
