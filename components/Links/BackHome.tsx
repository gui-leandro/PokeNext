import Link from 'next/link'
import { FunctionComponent } from 'react'
import { MdArrowBack } from 'react-icons/md'

export const GoBackHome: FunctionComponent = () => {
  return (
    <article
      className='
        flex items-center justify-center 
        uppercase text-white border-b-2 font-semibold'
    >
      <MdArrowBack size={20} className='mr-2' />
      <Link href={'/'}>Return to Home Page</Link>
    </article>
  )
}
