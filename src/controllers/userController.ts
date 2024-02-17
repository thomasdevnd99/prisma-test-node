import {Prisma} from "@prisma/client";
import * as userRepository from "../repository/userRepository";

// @ts-ignore
export async function signup(req, res) {
  const {name, email, posts} = req.body

  const postData = posts?.map((post: Prisma.PostCreateInput) => {
    return {title: post?.title, content: post?.content}
  })

  const result = await userRepository.create(postData)
  res.json(result)
}

// @ts-ignore
export async function getUsers(req, res) {
  const users = await userRepository.list()
  res.json(users)
}

// @ts-ignore
export async function getUsersDrafts(req, res) {
  const {id} = req.params
  const drafts = await userRepository.getUserPosts(id);

  res.json(drafts)
}

