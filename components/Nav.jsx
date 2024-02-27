"use client";

import Link from 'next/link'
import Image from 'next/image'
import {
  signIn, signOut, useSession, getProviders
} from 'next-auth/react'
import { useEffect, useState } from 'react';

const Nav = () => {
  const isLoggedIn = true;
  
  const [providers, setProviders] = useState(null)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Mobile navigation */}
      <div className='sm:flex hidden'>
        {
          isLoggedIn ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/create-prompt' className='black_btn'>
                Create Post
              </Link>
              <button className='outline_btn' onClick={signOut} type='button'>
                Sign Out
              </button>
              <Link href='/profile'>
                <Image src="/assets/images/logo.svg" width={37} height={37} alt='profile'/>
              </Link>
            </div>
          ) : (
            <>
              {providers && 
                Object.values(providers).map(provider => (
                  <button onClick={() => signIn(provider.id)} type='button' key={provider.name} className='black_btn'>
                    Sign In
                  </button>
                ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav