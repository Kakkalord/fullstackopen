const Blog = require ('../models/blog')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (likeTotal, blog) => {
        return likeTotal + blog.likes;
    }

    return blogs.reduce(reducer, 0);
}

const favouriteBlog = (blogs) => {
    const reducer = (blog1, blog2) => {
        return (blog1.likes > blog2.likes) ? blog1: blog2;
    }

    const blogWithMostLikes = blogs.reduce(reducer, blogs[0]);
    return {
        title: blogWithMostLikes.title,
        author: blogWithMostLikes.author,
        likes: blogWithMostLikes.likes
    }
}

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]

const getAllBlogs = async () => {
    const notes = await Blog.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    initialBlogs,
    getAllBlogs
}