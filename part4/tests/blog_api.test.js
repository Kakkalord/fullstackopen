const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('../utils/list_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialNotes) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

test('correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('verifies unique identifier is id, not _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
        expect(blog).toHaveProperty('id')
        expect(blog).not.toHaveProperty('_id')
    })
})

test('making HTTP Post successfully creates new blog post', async () => {
    // create new blog
    const newBlog = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    }

    // post new blog
    await api
        .post('/api/blogs')
        .save(newBlog)
        .expect(201)
        .expect('Content_Type', /application\/json/)

    // check total number of blogs +1
    const response = await helper.getAllBlogs()
    assert.strictEqual(response.length, helper.initialBlogs.length + 1)

    // verify content of newly saved content
    // for each content, check if newBlog.content exists
    const titles = response.map(blog => blog.title)
    assert(titles.includes(newBlog.title))
})