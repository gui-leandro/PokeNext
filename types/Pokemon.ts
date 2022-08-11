export type PokemonList = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

export type Pokemon = {
  name: string
  url: string
}

export type PokemonDetail = {
  id: string
  forms: {
    name: string
    url: string
  }[]
  abilities: {
    ability: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
    front_shiny: string
  }
}
