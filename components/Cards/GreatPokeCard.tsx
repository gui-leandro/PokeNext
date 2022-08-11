import classNames from 'classnames'
import Image from 'next/image'
import { ReactNode } from 'react'
import { PokemonDetail } from '../../types/Pokemon'

type GreatPokeCardProps = {
  pokemon: PokemonDetail
}

export const GreatPokeCard = ({ pokemon }: GreatPokeCardProps) => {
  return (
    <article
      className='
        flex flex-col items-center justify-center 
        bg-yellow-300 rounded-md p-6 mx-auto w-full max-w-xl h-full
        border-8 border-blue-500 transition-all'
    >
      <h1 className='font-semibold text-yellow-900 text-3xl mb-3'>{pokemon.id}</h1>
      <h2 className='uppercase text-yellow-900 font-bold text-3xl mb-6'>{pokemon.forms[0].name}</h2>
      <article className='sm:flex gap-2'>
        <article
          className='rounded-lg h-full mb-6 sm:mb-0'
          style={{
            background: 'url(/bg-gram.jpg) no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
        >
          <Image
            src={pokemon.sprites.front_default ?? '/no-image.png'}
            width={300}
            height={300}
            alt={pokemon.forms[0]?.name}
            className='absolute'
          />
          <article className='bg-blue-500 p-2 rounded-b-lg'>
            <h1 className='text-white text-center'>Default</h1>
          </article>
        </article>
        <article
          className='rounded-lg h-full'
          style={{
            background: 'url(/bg-gram.jpg) no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
          }}
        >
          <Image
            src={pokemon.sprites.front_shiny ?? '/no-image.png'}
            width={300}
            height={300}
            alt={pokemon.forms[0]?.name}
            className='absolute'
          />
          <article className='bg-blue-900 p-2 rounded-b-lg'>
            <h1 className='text-white text-center'>Shiny</h1>
          </article>
        </article>
      </article>
      <article
        className='
          text-white bg-red-500 pb-2 w-full text-center mt-6 rounded-lg
        '
      >
        <h1 className='text-xl font-semibold bg-red-700 rounded-t-lg p-2'>Skills</h1>
        {pokemon.abilities.map((item: any, index: number) => (
          <p key={index} className='p-2 capitalize'>{item.ability.name}</p>
        ))}
      </article>
    </article>
  )
}
