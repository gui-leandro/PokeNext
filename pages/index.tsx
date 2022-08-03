import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { Pokemon, PokemonList, PokemonDetail } from '../types/Pokemon'
import { pokeAPI, pokemonData } from './api/api'

const Home: NextPage = () => {
  // States
  const [loading, setLoading] = useState(true)
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')
  const [search, setSearch] = useState('')
  const [totalPokemons, setTotalPokemons] = useState(0)
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([])

  const getPokemons = async (params = 'offset=0&limit=20') => {
    const res = await pokeAPI.get(`pokemon?${params}`)
    const pokemonList: PokemonList = res.data

    setNextPage(pokemonList.next ? pokemonList.next.split('?')[1] : '')
    setPreviousPage(
      pokemonList.previous ? pokemonList.previous.split('?')[1] : ''
    )

    const getPokemonDetails = pokemonList.results.map(
      async (pokemon: Pokemon) => {
        const pokemonDetail: PokemonDetail = await pokemonData(pokemon.url)

        if (pokemonDetail) {
          return {
            id: pokemonDetail.id,
            forms: pokemonDetail.forms,
            abilities: pokemonDetail.abilities,
            sprites: pokemonDetail.sprites,
          }
        }

        return null
      }
    )

    const pokemonDetails = (await Promise.all(
      getPokemonDetails
    )) as PokemonDetail[]

    if (pokemonDetails.length) {
      setPokemons(pokemonDetails)
      setTotalPokemons(pokemonList.count)
      setLoading(false)
      return true
    }

    return false
  }

  useEffect(() => {
    getPokemons()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>PokeNext</title>
      </Head>

      <article>
        <input
          type='text'
          name='pokemonSearch'
          id='pokemonSearch'
          placeholder='Busque pelo nome'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <p>Total: {totalPokemons}</p>
      </article>
      <section>
        <article className='grid grid-cols-3 gap-3 items-center border max-w-xl'>
          {pokemons.map((pokemon: PokemonDetail, index: number) => (
            <article
              key={index}
              className='
                flex flex-col items-center justify-center
                bg-gray-100 rounded-md p-6 w-40'
            >
              <Image
                src={pokemon.sprites.front_default}
                width={120}
                height={120}
                quality={75}
                alt={pokemon.forms[0].name}
                className='absolute'
              />
              <pre className='my-2 text-center uppercase'>
                {pokemon.forms[0].name}
              </pre>
            </article>
          ))}
        </article>
        <button
          onClick={() => getPokemons(previousPage)}
          disabled={previousPage === ''}
          className='
            p-4 bg-gray-400
          '
        >
          previous
        </button>
        <button
          onClick={() => getPokemons(nextPage)}
          disabled={nextPage === ''}
          className='
            p-4 bg-blue-400
          '
        >
          next
        </button>
      </section>
    </>
  )
}

export default Home
