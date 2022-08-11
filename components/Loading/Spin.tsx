import Image from 'next/image'
import React, { FunctionComponent } from 'react'

export const Spin: FunctionComponent = () => {
  return (
      <Image
        src={'/spin.png'}
        width={100}
        height={100}
        alt='Spinner Loading'
        className='animate-spin'
      />
  )
}
