import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNoteVisible, setNewNoteVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.steItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    setUser(null)
  }

    // add new blog to existing blogs
  const addBlog = async ({ newBlog }) => {
    const createdBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(createdBlog))
  }
  
  const createBlogForm = () => {
    const hideWhenVisible = { display: newNoteVisible ? 'none' : '' }
    const showWhenVisible = { display: newNoteVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewNoteVisible(true)}>New Blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog}/>
          <button onClick={() => setNewNoteVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <Login 
        handleLogin={handleLogin} 
        username={username} 
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}/>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in</p>
      <button type="submit" onSubmit={handleLogout}>logout</button>

      <div>
        {createBlogForm()}
      </div>

      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App