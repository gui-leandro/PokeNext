import classNames from 'classnames'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Pokemon, PokemonList, PokemonDetail } from '../types/Pokemon'
import { pokeAPI, pokemonData, searchPokemon } from './api/api'

// Icons
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'

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

    const pokemonDetails = (await Promise.all(getPokemonDetails)).filter(
      (result) => result !== null
    ) as PokemonDetail[]

    if (pokemonDetails.length) {
      setPokemons(pokemonDetails)
      setTotalPokemons(pokemonList.count)
      setLoading(false)
      return true
    }

    return false
  }

  const getSearchPokemon = async (name: string) => {
    if (name) {
      const res = await searchPokemon(name.toLowerCase())
      const pokemon = res

      if (pokemon) {
        const pokeFormat = [{
          id: pokemon.id,
          forms: pokemon.forms,
          abilities: pokemon.abilities,
          sprites: pokemon.sprites,
        }] as PokemonDetail[]

        return pokeFormat
      }

      return []
    }

    return null
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

      <main className='mx-auto relative'>
        <header className='flex flex-col items-center mb-6 p-6 bg-red-500'>
          <Image
            src={'/logo.png'}
            width={250}
            height={101}
            alt='Pokemon Logo'
          />
          <form
            className='flex mt-2'
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              const submitted = await getSearchPokemon(search)

              if (submitted === null) {
                await getPokemons()
                return
              }

              return setPokemons(submitted)
            }}
          >
            <input
              type='text'
              name='pokemonSearch'
              id='pokemonSearch'
              placeholder='Search by name'
              className='border border-gray-300 py-1 px-3 rounded-l-lg'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <button
              type='submit'
              className='
                text-white 
                bg-yellow-500 hover:bg-yellow-600 
                rounded-r-lg py-2 px-3 transition-all'
            >
              <AiOutlineSearch className='rotate-90' />
            </button>
          </form>
        </header>
        <section className='mx-auto max-w-xl'>
          {/* Pokemon cards */}
          <p className='text-lg text-center mb-6 text-gray-700 font-bold'>
            Total: {totalPokemons}
          </p>
          {pokemons.length ? (
            <article
              className='
              grid sm:grid-cols-3 grid-cols-2 gap-3 px-2 items-center'
            >
              {pokemons.map((pokemon: PokemonDetail, index: number) => (
                <article
                  key={index}
                  className={classNames(
                    'flex flex-col items-center justify-center',
                    'bg-gray-100 rounded-md p-6 mx-auto w-40',
                    'border-2 hover:border-4 transition-all cursor-pointer',
                    index % 2 === 0 ? 'border-yellow-500' : 'border-red-500'
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
                </article>
              ))}
            </article>
          ) : (
            <article
              className='
                flex flex-col items-center justify-center bg-gray-100
                p-6 mx-auto'
            >
              <p>Pokemon not found</p>
            </article>
          )}
          {/* Pagination buttons */}
          <article className='flex items-center justify-center p-3'>
            <button
              onClick={() => getPokemons(previousPage)}
              disabled={previousPage === ''}
              className={classNames(
                'w-20 p-4 font-bold text-3xl text-white rounded-l-lg',
                previousPage === ''
                  ? 'bg-gray-400'
                  : 'bg-yellow-500 hover:bg-yellow-600 transition-all'
              )}
            >
              <MdNavigateBefore className='mx-auto' />
            </button>
            <button
              onClick={() => getPokemons(nextPage)}
              disabled={nextPage === ''}
              className={classNames(
                'w-20 p-4 font-bold text-white text-3xl rounded-r-lg',
                nextPage === ''
                  ? 'bg-gray-400'
                  : 'bg-red-500 hover:bg-red-600 transition-all'
              )}
            >
              <MdNavigateNext className='mx-auto' />
            </button>
          </article>
        </section>
      </main>
    </>
  )
}

export default Home
