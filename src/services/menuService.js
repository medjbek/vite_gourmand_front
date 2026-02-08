import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export async function fetchMenus() {
  const res = await axios.get(`${API_URL}/menus`)
  const payload = res.data

  /*
   *  Ancien CODE
   * -----------------------------------------------------
   * export async function fetchMenus() {
   *   const menu = await axios.get(`${API_URL}/menus`)
   *   return menu.data
   * }
   * Attention paginate() côté Laravel permet l envoie de reponse sous forme objet et tableau.
   * S'assurer cote front que ce ne soit que des tableaux
   */

  // Cas  Laravel paginate() multi format
  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  // Cas sans pagination
  if (Array.isArray(payload)) {
    return payload
  }

  return []
}
