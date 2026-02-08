import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchOpeningHours() {
  const openingHours = await axios.get(`${API_URL}/opening-hours`)
  return openingHours.data
}
