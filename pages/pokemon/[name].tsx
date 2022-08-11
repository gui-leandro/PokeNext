import { Pokemon, PokemonDetail } from '../../types/Pokemon'
import { pokeAPI, searchPokemon } from '../api/api'
import { GetStaticPaths } from 'next'
import { GreatPokeCard } from '../../components/Cards/GreatPokeCard'
import Head from 'next/head'
import { GoBackHome } from '../../components/Links/BackHome'

type Params = {
  params: {
    name: string
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await pokeAPI.get('pokemon?offset=0&limit=1200')
  const totalPaths: Params[] = res.data.results.map((res: Pokemon) => {
    if (res !== null) {
      return {
        params: {
          name: res.name,
        },
      } as Params
    }
  })

  return {
    paths: totalPaths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const pokeName = String(params.name).toLowerCase()

  const res = await searchPokemon(pokeName)

  const pokeFormat = {
    id: res?.id,
    forms: res?.forms,
    abilities: res?.abilities,
    sprites: res?.sprites,
  }

  return {
    props: {
      pokemon: JSON.stringify(pokeFormat),
    },
  }
}

const PokemonPage = (props: any) => {
  // Static Props
  const pokemon: PokemonDetail = JSON.parse(props.pokemon)

  const capitalizedName =
    pokemon.forms[0].name.charAt(0).toUpperCase() +
    pokemon.forms[0].name.slice(1)

  return (
    <>
      <Head>
        <title>PokeNext - {String(capitalizedName)}</title>
      </Head>

      <main
        className='
          flex flex-col items-center justify-center p-6 min-h-screen'
        style={{
          background: 'url(/bg-poke-page.jpg) no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <article
          className='
            lg:ml-5
            max-w-sm py-6
            bottom-0 left-30 right-auto'
        >
          <GoBackHome />
        </article>
        <GreatPokeCard pokemon={pokemon} />
      </main>
    </>
  )
}

export default PokemonPage
