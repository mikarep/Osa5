import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'

const Notification = (props) => {
  if (props.message === null) {
    return null
  }

  return (
    <div className={props.class}>
      {props.message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nimi, setName] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [classOfMessege, setClassOfMessege] = useState('success')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const blogRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setName(user.name)
      console.log('user:', user)
      setUsername('')
      setPassword('')
      setErrorMessage('Logged in')
      setClassOfMessege('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setClassOfMessege('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setErrorMessage('Logout')
    setClassOfMessege('success')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleCreate = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      console.log('blog:', blog)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      setErrorMessage(`${blog.title} by ${blog.author} added`)
      setClassOfMessege('success')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('author or url is missing')
      setClassOfMessege('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} class={classOfMessege}/>
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} class={classOfMessege}/>
      <div>
        {nimi} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogRef}>
          <NewBlogForm createBlog={handleCreate}/>
        </Togglable>
      </div>
      <div id='blogs'>
        {blogs.sort((a, b) => a.likes < b.likes ? 1 : -1).map(blog =>
          <Blog key={blog.id} blog={blog} user={user}/>
        )}
      </div>
    </div>
  )
}

export default App