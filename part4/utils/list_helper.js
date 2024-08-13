const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (likeTotal, blog) => {
        return likeTotal + blog.likes;
    }

    return blogs.reduce(reducer, 0);
}

module.exports = {
    dummy,
    totalLikes,
}