import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { Pokemon, PokemonList } from '../types/Pokemon'
import { pokeAPI } from './api/api'

export const getStaticProps: GetStaticProps = async () => {
  const res = await pokeAPI.get('pokemon')
  const pokemonList: PokemonList = res.data

  return { props: { pokemonList }, revalidate: 60 }
}

const Home: NextPage = ({
  pokemonList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!pokemonList) {
    return <p>An error has occurred to load the pokemon list...</p>
  }

  return (
    <>
      <Head>
        <title>PokeNext</title>
      </Head>

      {pokemonList.results.map((pokemon: Pokemon, index: number) => (
        <pre className='mb-2 bg-gray-100'>{pokemon.name}</pre>
      ))}
    </>
  )
}

export default Home
