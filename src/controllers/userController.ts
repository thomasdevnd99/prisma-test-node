import {Prisma} from "@prisma/client";
import prisma from "../database/db";

export async function signup (req, res) {
    const { name, email, posts } = req.body

    const postData = posts?.map((post: Prisma.PostCreateInput) => {
        return { title: post?.title, content: post?.content }
    })

    const result = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: postData,
            },
        },
    })
    res.json(result)
}

export async function getUsers(req, res) {
    const users = await prisma.user.findMany()
    res.json(users)
}

export async function getUsersDrafts(req, res) {
    const { id } = req.params

    const drafts = await prisma.user
        .findUnique({
            where: {
                id: Number(id),
            },
        })
        .posts({
            where: { published: false },
        })

    res.json(drafts)
}

