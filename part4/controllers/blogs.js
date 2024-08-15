const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

blogRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/api/blogs', (request, response) => {
// validating if no url or 
  const { title, url } = request.body

  if (!title || !url) {
    response.status(400).json({error: 'Bad Request'})
  }

  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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