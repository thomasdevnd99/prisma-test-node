import prisma from "../database/db";
import {Prisma} from "@prisma/client";


// @ts-ignore
export async function createPost(req, res) {
    const {title, content, authorEmail} = req.body
    const result = await prisma.post.create({
        data: {
            title,
            content,
            author: {connect: {email: authorEmail}},
        },
    })
    res.json(result)
}
// @ts-ignore
export async function view(req, res) {
    const {id} = req.params

    try {
        const post = await prisma.post.update({
            where: {id: Number(id)},
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        })

        res.json(post)
    } catch (error) {
        res.json({error: `Post with ID ${id} does not exist in the database`})
    }
}
// @ts-ignore
export async function publish(req, res) {
    const {id} = req.params

    try {
        const postData = await prisma.post.findUnique({
            where: {id: Number(id)},
            select: {
                published: true,
            },
        })

        const updatedPost = await prisma.post.update({
            where: {id: Number(id) || undefined},
            data: {published: !postData?.published},
        })
        res.json(updatedPost)
    } catch (error) {
        res.json({error: `Post with ID ${id} does not exist in the database`})
    }
}

// @ts-ignore
export async function removeOne(req, res) {
    const {id} = req.params
    const post = await prisma.post.delete({
        where: {
            id: Number(id),
        },
    })
    res.json(post)
}

// @ts-ignore
export async function getOne(req, res) {
    const {id}: { id?: string } = req.params

    const post = await prisma.post.findUnique({
        where: {id: Number(id)},
    })
    res.json(post)
}

// @ts-ignore
export async function list(req, res) {
    const {searchString, skip, take, orderBy} = req.query

    const or: Prisma.PostWhereInput = searchString
        ? {
            OR: [
                {title: {contains: searchString as string}},
                {content: {contains: searchString as string}},
            ],
        }
        : {}

    const posts = await prisma.post.findMany({
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

    res.json(posts)
}
