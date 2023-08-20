import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLike = async updateObject => {
  const urlWithId = baseUrl + '/' + updateObject.id
  console.log('object id:', updateObject.id)
  console.log('urlWithId:', urlWithId)

  const response = await axios.put(urlWithId, updateObject)
  if (response) {
    return response.data
  }
}

const deleteBlog = async deleteObject => {
  const config = {
    headers: { Authorization: token }
  }
  const urlWithId = baseUrl + '/' + deleteObject.id
  const response = await axios.delete(urlWithId, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, updateLike, deleteBlog }