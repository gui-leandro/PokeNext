import axios from 'axios'

export const pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export const pokemonData = async (url: string) => {
  try {
    const res = await axios.get(url)

    if (res.data) return res.data

    return null
  } catch (error) {
    console.log('error: ', error)
  }
}

export const searchPokemon = async (name: string) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

    if (res.data) return res.data

    return null
  } catch (error) {
    console.log('error: ', error)
  }
}
