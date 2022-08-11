import { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className='flex flex-col items-center mb-6 p-6 bg-red-500'>
      {children}
    </header>
  )
}
