import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

export async function fetchMenus() {
  const menu = await axios.get(`${API_URL}/menus`)
  return menu.data
}
