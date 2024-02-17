import * as postRepository from "../repository/postRepository";


// @ts-ignore
export async function createPost(req, res) {
  const result = await postRepository.create(req.body)
  res.json(result)
}

// @ts-ignore
export async function view(req, res) {
  const {id} = req.params

  try {
    const post = await postRepository.viewPost(id)

    res.json(post)
  } catch (error) {
    res.json({error: `Post with ID ${id} does not exist in the database`})
  }
}

// @ts-ignore
export async function publish(req, res) {
  const {id} = req.params

  try {
    const updatedPost = await postRepository.publish(id)
    res.json(updatedPost)
  } catch (error) {
    res.json({error: `Post with ID ${id} does not exist in the database`})
  }
}

// @ts-ignore
export async function removeOne(req, res) {
  const {id} = req.params
  const post = await postRepository.remove(id)
  res.json(post)
}

// @ts-ignore
export async function getOne(req, res) {
  const {id}: { id?: string } = req.params
  // @ts-ignore
  const post = await postRepository.getOne(id)

  res.json(post)
}

// @ts-ignore
export async function list(req, res) {
  const {searchString, skip, take, orderBy} = req.query
  const posts = await postRepository.list({searchString, skip, take, orderBy})

  res.json(posts)
}
