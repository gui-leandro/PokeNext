import { useContext } from 'react'
import FavoriteContext from '../../contexts/favoritesContexts'

export const NavBar = () => {
  const { favoritePokemons } = useContext(FavoriteContext)

  return (
    <nav className='bg-[#3352a1] w-full fixed top-0 p-2 z-10'>
      <button
        className='
          bg-white border-2 border-[#3352a1] text-[#3352a1]'
      >
        Favorites: { favoritePokemons.length }
      </button>
    </nav>
  )
}
