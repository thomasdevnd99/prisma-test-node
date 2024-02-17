import express from 'express'
import * as userController from './controllers/userController'
import prisma from "./database/db";
import * as postController from "./controllers/postController";

const app = express()

app.use(express.json())

app.post(`/signup`, userController.signup)
app.get('/users', userController.getUsers)
app.get('/user/:id/drafts', userController.getUsersDrafts)

app.post(`/post`, postController.createPost)
app.put('/post/:id/views', postController.view)
app.put('/publish/:id', postController.publish)
app.delete(`/post/:id`, postController.removeOne);
app.get(`/post/:id`, postController.getOne);
app.get('/feed', postController.list);

const server = app.listen(3000, () =>
    console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
