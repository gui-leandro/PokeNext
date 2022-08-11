import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { PokemonDetail } from '../../types/Pokemon'

type PokeCardProps = {
  pokemon: PokemonDetail
  className?: string
}

export const PokeCard = ({ pokemon, className }: PokeCardProps) => {
  return (
    <article
      className={classNames(
        'flex flex-col items-center justify-center',
        'bg-gray-100 rounded-md p-6 mx-auto w-40',
        'border-2 hover:border-4 transition-all',
        className ?? 'border-black'
      )}
    >
      <h5 className='text-gray-500 text-xl mb-2'>{pokemon.id}</h5>
      <Image
        src={pokemon.sprites.front_default ?? '/no-image.png'}
        width={120}
        height={120}
        quality={75}
        alt={pokemon.forms[0]?.name}
        className='absolute'
      />
      <small className='my-2 text-center text-gray-700 uppercase'>
        {pokemon.forms[0]?.name}
      </small>
      <Link href={`pokemon/${pokemon.forms[0]?.name}`} passHref>
        <a
          className='
            w-full text-sm text-center
            text-white bg-red-500
            rounded-lg p-1 hover:opacity-90 transition-all
          '
        >
          Details
        </a>
      </Link>
    </article>
  )
}
