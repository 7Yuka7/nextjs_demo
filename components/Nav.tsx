"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  const [providers, setProviders] = useState<null | any>(null)
  
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/logo.svg"
          alt='Promptia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptita</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        { isUserLoggedIn ? (
          // login html
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>

            <button 
              type='button' 
              onClick={() => {signOut}} 
              className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image 
                src="/assets/images/logo.svg"
                className='rounded-full'
                width={37}
                height={37}
                alt='Profile Picture'
              />
            </Link>
          </div>
        ) : (
          <>
          {providers &&
            Object.values(providers).map((provider: any) => (
              <button 
                type='button' 
                key={provider.name} 
                onClick={() => {
                  signIn(provider.id)
                }}
                className='black_btn'
              >
                Sign in
              </button>
            ))}
          </>
        )

        }
      </div>

      {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          // login html
          <div className='flex'>

              <Image
                src="/assets/images/logo.svg"
                className='rounded-full cursor-pointer'
                width={37}
                height={37}
                alt='Profile Picture'
                onClick={() => { setToggleDropdown((prev) => !prev) }}
              />
              {/* show drop down */}
              {toggleDropdown && (
                <div className='dropdown'>
                  <Link 
                    href="/profile" 
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    href="/create-prompt"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type='button'
                    onClick={() => { 
                      setToggleDropdown(false) 
                      signOut()
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign out
                  </button>
                </div>
              )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button 
                  type='button' 
                  key={provider.name} 
                  onClick={() => {
                    signIn(provider.id)
                  }}
                  className='black_btn'
                >
                  Sign in
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