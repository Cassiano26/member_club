import { apiConfig } from './api-config.js'

export async function findClientById(id) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/clients/${id}`)

    const data = await response.json()

    return data

  } catch (error) {
    alert("Não foi possível buscar o cliente")
  }

}