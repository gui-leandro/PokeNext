import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { MdCatchingPokemon } from 'react-icons/md'

export const Footer: FunctionComponent = () => {
  return (
    <footer
      className='
        flex flex-col items-center justify-center bg-gray-800 px-2 py-10'
    >
      <Link href={'/'} passHref>
        <a className='cursor-pointer'>
          <Image
            src={'/pokenext-logo.png'}
            width={208}
            height={72}
            alt='PokeNext Logo'
          />
        </a>
      </Link>

      <article className='max-w-sm w-full mt-5'>
        <p className='text-center text-white text-lg font-medium'>
          2022 - Guilherme Leandro Rolim
        </p>
        <article className='flex items-center justify-center mt-6'>
          <Link href={'https://github.com/guirdy/pokenext'} passHref>
            <a
              className='
                flex 
                items-center justify-center 
                text-md text-center text-white p-1
              '
              target={'_blank'}
            >
              <AiFillGithub className='mr-2' /> Github
            </a>
          </Link>
        </article>
        <article className='flex items-center justify-center'>
          <Link href={'https://pokeapi.co/'} passHref>
            <a
              className='
                flex 
                items-center justify-center 
                text-md text-center text-white p-1
              '
              target={'_blank'}
            >
              <MdCatchingPokemon className='mr-2' /> PokeAPI
            </a>
          </Link>
        </article>
      </article>
    </footer>
  )
}
