import NewTask from '@/components/forms/new-task'
import TitleH1 from '@/components/titles/title-h1'
import Link from 'next/link'
import React from 'react'
import { FaCircleArrowLeft } from 'react-icons/fa6'

export default function page() {
  return (
    <div className='my-5 p-3 max-w-screen-sm m-auto rounded-lg shadow-md border border-slate-100'>
      <div className='w-full flex'>
        <Link href="/tasks" className='flex flex-row items-center justify-center gap-1 text-slate-400 hover:text-slate-800'><FaCircleArrowLeft />Volver</Link>
      </div>
      <div className='my-3 flex flex-row justify-between w-full'>
        <TitleH1 title='New task' />
      </div>
      <br />
      <NewTask />
    </div>
  )
}
