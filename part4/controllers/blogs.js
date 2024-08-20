const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

blogRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  
  return response.json(blogs)
})

blogRouter.post('/api/blogs', async (request, response) => {
// validating if no url or 
  const { title, url } = request.body

  if (!title || !url) {
    response.status(400).json({error: 'Bad Request'})
  }

  
  const usersArray = User.find({})

  let user;
  if (usersArray.length > 0) {
    user = usersArray[0]
  } else {
    return response.status(400).json({ error: 'No Users Found' })
  }

  const blog = new Blog({
    ...request.body,
    user: user
  })

  await blog
    .save()

  return response.status(201).json(result)
})

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('api/blogs/:id', async (request, response) => {
  const blog = request.body

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogRouter