import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    // state of newBlog
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    });

    // handleChange
    const handleChange = (event) => {
        const { name, value } = event.target
        // update event target field
        setNewBlog({
            ...newBlog,
            [name]: value
        })
    }

    // handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({
            title: '',
            author: '',
            url: ''
        })
    }

    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={handleSubmit}>
                <div>title: <input name='title' value={newBlog.title} onChange={handleChange}/></div>
                <div>author: <input name='author' value={newBlog.author} onChange={handleChange}/></div>
                <div>url: <input name='url' value={newBlog.url} onChange={handleChange}/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm