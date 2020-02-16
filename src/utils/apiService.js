import axios from 'axios'

/**
 * Examples
 */
const BASE_URL = 'http://localhost:8080/api/'

export const demoService = {
  getFeed
}

export function getFeed() {
  const url = BASE_URL + 'demo'
  return axios.get(url)
}