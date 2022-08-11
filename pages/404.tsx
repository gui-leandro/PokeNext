import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import { GoBackHome } from '../components/Links/BackHome'
import Head from 'next/head'

const ErrorPage: NextPage = () => {
  return (
    <>
    <Head>
      <title>404 - Page Not Found</title>
    </Head>
      <main
        className='p-6 h-screen'
        style={{
          background: 'url(/bg-poke-page.jpg) no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <section
          className='
          relative flex items-center w-full mx-auto
          max-w-7xl h-full lg:p-24'
        >
          <article
            className='
            text-white text-center max-w-lg w-full lg:mx-0 mx-auto'
          >
            <h1 className='text-7xl font-bold mb-2'>404</h1>
            <h2 className='text-4xl font-bold mb-2'>Sorry!</h2>
            <p className='text-2xl font-semibold'>
              The page you're looking for is not available.
            </p>
          </article>
          <article
            className='
            lg:ml-5
            absolute py-6
            bottom-0 left-30 right-auto'
          >
            <GoBackHome />
          </article>
          <article
            className='
            hidden lg:block absolute bottom-0 left-auto right-20'
          >
            <Image
              src={'/psy-duck.png'}
              width={360}
              height={474}
              alt='Psy Duck'
            />
          </article>
          <article
            className='
            absolute top-0 right-auto left-20'
          >
            <Image
              src={'/pidgeot.png'}
              width={170}
              height={170}
              alt='Pidgeot'
            />
          </article>
        </section>
      </main>
    </>
  )
}

export default ErrorPage
