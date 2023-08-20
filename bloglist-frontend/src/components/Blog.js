import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const shouldShowRemove = () => {
    console.log('user:', user)
    console.log('username:', blog.user.username)
    if (user.name === blog.user.name) {
      return true
    } else {
      return false
    }
  }

  const [visible, setVisible] = useState(false)
  const [likes , setLikes] = useState(blog.likes)
  const [show] = useState(shouldShowRemove)
  const showRemove = { display: show ? '' : 'none' }

  const handleLike = () => {
    blog.likes = blog.likes + 1
    setLikes(blog.likes)
    blogService.updateLike(blog)
  }

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete that blog?')) {
      blogService.deleteBlog(blog)
    }
  }

  if (visible) {
    return (
      <div>
        <div className='visibleBlog' style={blogStyle}>
          <div>
            {blog.title} {blog.author} <button onClick={() => setVisible(false)}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
            Likes: {likes} <button id='like-button' onClick={handleLike}>Like</button>
          </div>
          <div>
           added by {blog.user.name}
          </div>
          <div style={showRemove}>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div id='hidden' className='hiddenBlog' style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
        </div>
        <div style={showRemove}>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog