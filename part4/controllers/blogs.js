const blogRouter = require('express').Router()
const { nextTick } = require('process')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  
  return response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
// validating if no url or 
  const { title, url } = request.body

  if (!title || !url) {
    response.status(400).json({error: 'Bad Request'})
  }

  const user = request.user

  const blog = new Blog({
    ...request.body,
    user: user
  })

  await blog
    .save()

  return response.status(201).json(result)
})


blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  
  // find the blog using request.params.id
  const blog = await Blog.findById(request.params.id)

  // validate request.token with users token
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'forbidden' })
  }

  // if correct, delete blog
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


blogRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter