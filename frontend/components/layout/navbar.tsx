'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { FaCircleUser, FaFilePen } from 'react-icons/fa6';
import { useSessionHook } from '@/context/SessionContext';

type Props = {
  verification: any;
}

const Navbar = ({ verification }: Props) => {
  const pathname = usePathname()
  const { session, setSession } = useSessionHook();


  useEffect(() => {
    console.log('USER CONTEXT', session)
    console.log('VERIFICATION', verification)

    if (verification?.status) {
      if (session.id === undefined || session.id === null) {
        setSession({
          id: verification.data.id,
          username: verification.data.username,
        })
      }
    }
  }, [verification, session, session.id, setSession])

  const consola = () => {
    console.log('USER CONTEXT', session)
  }

  return (
    <header className='w-screen bg-white dark:bg-black dark:text-white p-5 border-b border-slate-200 dark:border-neutral-800 flex flex-row justify-between items-center'>
      <div className='flex flex-row items-center gap-2 font-semibold'><FaFilePen />To do list</div>
      <div className='flex flex-row'>
        <ul className='flex flex-row items-center gap-5 text-slate-700'>
          <li className={`hover:scale-110 transition-all duration-300 ease-in-out text-slate-700 dark:text-white p-1 ${pathname === '/' ? 'font-bold' : 'font-light'}`}>
            <Link href="/">Home</Link>
          </li>
          <li className={`hover:scale-110 transition-all duration-300 ease-in-out text-slate-700 dark:text-white p-1 ${pathname === '/tasks' ? 'font-bold' : 'font-light'}`}>
            <Link href="/tasks">Tasks</Link>
          </li>
          {
            session.id !== null ? (
              <li className={`hover:scale-110 transition-all duration-300 ease-in-out bg-slate-700 rounded-lg text-white px-2 py-1`}>
                <Link href="/profile" className='flex flex-row items-center gap-1'><FaCircleUser />{session.username}</Link>
              </li>
            ) : (
              <li className={`hover:scale-110 transition-all duration-300 ease-in-out text-slate-700 dark:text-white p-1 ${pathname === '/login' ? 'font-bold' : 'font-light'}`}>
                <Link href="/login">Login</Link>
              </li>
            )
          }
          {/* <li className='hover:scale-110 transition-all duration-300 ease-in-out text-slate-700 dark:text-white p-1'>
            <Link href="/"><FaUserLarge /></Link>
          </li> */}
        </ul>
      </div>
    </header>
  )
}

export default Navbar;