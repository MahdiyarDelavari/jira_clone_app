import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DottedSeparator } from './DottedSeparator'
import Navigation from './Navigation'

const Sidebar = () => {
  return (
      <aside className='h-full bg-neutral-100 p-4 w-full'>
          <Link href={"/"}>
            <Image src={"/logo.svg"} height={48} width={164} alt="logo"/>
          </Link>
          <DottedSeparator className='my-4' />
          <Navigation/>
    </aside>
  )
}

export default Sidebar