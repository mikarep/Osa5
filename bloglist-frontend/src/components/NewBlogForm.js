import { useState } from 'react'
import PropTypes from 'prop-types'


const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h1>Create new</h1>
      <form onSubmit={addBlog}>
        <div>
              title:
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            placeholder='write title here'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
              author:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            placeholder='write author here'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
              url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            placeholder='write url here'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='blog-submit' type="submit">create</button>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm


