import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

export async function fetchOpeningHours() {
  const openingHours = await axios.get(`${API_URL}/opening-hours`)
  return openingHours.data
}
