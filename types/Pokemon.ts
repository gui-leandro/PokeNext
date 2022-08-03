export type PokemonList = {
  count: number
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
  }[]
  sprites: {
    abilities: {
      ability: {
        name: string
      }
    }[]
  }
  versions: {
    generationV: {
      blackWhite: {
        animated: {
          frontDefault: string
          frontShiny: string
        }
      }
    }
  }
}
