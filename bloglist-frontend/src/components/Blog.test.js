import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Blog from './Blog'
import BlogForm from './NewBlogForm'

const blog = {
    title: 'Testin title 0',
    author: 'Testin Author',
    url: 'Testin Url',
    likes: 0,
    user: {
        username: 'Testin User',
        name: 'User'
    }
}

jest.mock('axios')


test('renders blog', () => {

    const {container} = render(<Blog blog={blog} user={blog.user}/>)

    const div = container.querySelector('.hiddenBlog')

    expect(div).toHaveTextContent('Testin title 0')
})

test('show url, likes and user', async () => {
    render(<Blog blog={blog} user={blog.user}/>)

    const userE = userEvent.setup()
    const button = screen.getByText('view')
    await userE.click(button)

    const elementUrl = screen.getByText('Testin Url')
    const elementLikes = screen.getByText('Likes: 0')
    const elementUser = screen.getByText('added by User')

    expect(elementUrl).toBeDefined()
    expect(elementLikes).toBeDefined()
    expect(elementUser).toBeDefined()
})

test('add 2 likes', async () => {
    render(<Blog blog={blog} user={blog.user}/>)

    const userE = userEvent.setup()

    const buttonView = screen.getByText('view')
    await userE.click(buttonView)

    const button = screen.getByText('Like')
    await userE.click(button)
    await userE.click(button)

    const elementLikes = screen.getByText('Likes: 2')
    expect(elementLikes).toBeDefined()
})

test('NewBlogForm', async () => {
    const userE = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog}/>)

    const inputTitle = screen.getByPlaceholderText('write title here')
    const inputAuthor = screen.getByPlaceholderText('write author here')
    const inputUrl = screen.getByPlaceholderText('write url here')

    const createButton = screen.getByText('create')

    await userE.type(inputTitle, 'Testin Title 1')
    await userE.type(inputAuthor, 'Testin Author')
    await userE.type(inputUrl, 'Testin Url 1')
    await userE.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testin Title 1' )

})