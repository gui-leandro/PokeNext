import { createContext  } from "react";
import { PokemonDetail } from '../types/Pokemon'

const FavoriteContext = createContext({
  favoritePokemons: [] as PokemonDetail[],
  updateFavoritePokemons: (pokemon: PokemonDetail) => null
})

export const FavoriteProvider = FavoriteContext.Provider

export default FavoriteContext