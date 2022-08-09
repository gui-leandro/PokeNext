import React, { useContext } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import FavoriteContext from '../../contexts/favoritesContexts'
import { PokemonDetail } from '../../types/Pokemon'

type FavoriteButtonProps = {
  pokemon: PokemonDetail
}

export const FavoriteButton = ({ pokemon }: FavoriteButtonProps) => {
  // Context
  const { favoritePokemons, updateFavoritePokemons } =
    useContext(FavoriteContext)

  const heart = favoritePokemons.includes(pokemon) ? (
    <MdFavorite className='mx-auto' />
  ) : (
    <MdFavoriteBorder className='mx-auto' />
  )

  const onHeartClick = () => {
    updateFavoritePokemons(pokemon)
  }

  return (
    <button
      className='
        cursor-pointer w-full 
        text-white bg-red-500
        rounded-lg p-2 hover:opacity-90 transition-all'
      onClick={onHeartClick}
    >
      {heart}
    </button>
  )
}
