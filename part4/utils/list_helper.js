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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
}