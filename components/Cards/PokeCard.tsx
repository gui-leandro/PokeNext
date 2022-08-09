import classNames from 'classnames'
import { ReactNode } from 'react'

type PokeCardProps = {
  children: ReactNode
  className?: string
}

export const PokeCard = ({ children, className }: PokeCardProps) => {
  return (
    <article
      className={classNames(
        'flex flex-col items-center justify-center',
        'bg-gray-100 rounded-md p-6 mx-auto w-40',
        'border-2 hover:border-4 transition-all',
        className ?? 'border-black'
      )}
    >
      {children}
    </article>
  )
}
