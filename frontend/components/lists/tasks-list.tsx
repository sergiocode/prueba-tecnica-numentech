'use client'
import React, { useState } from 'react'
import ListItem from './list-item'
import Image from 'next/image'
import Link from 'next/link'
import { FaSquarePlus } from 'react-icons/fa6'
import { useSessionHook } from '@/context/SessionContext'
import TitleH1 from '../titles/title-h1'

type Props = {
  tasks: Task[]
}

const TasksList = ({ tasks }: Props) => {
  const [isSession, setIsSession] = useState<boolean>(true)
  const { session, setSession } = useSessionHook();

  return (
    <div>
      <div className='my-5 flex flex-row justify-between items-center w-full'>
        <TitleH1 title='Tasks list!' />
        {
          session.id !== null && (
            <Link href="/tasks/new" type='submit' className='p-[1px] bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-md outline-none w-fit'>
              <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaSquarePlus />New task</div>
            </Link>
          )
        }
      </div>
      {
        tasks?.length === 0 ? (
          <div className='m-auto w-full flex flex-col justify-center items-center gap-3 py-16'>
            <p className='text-3xl text-slate-600'>🙌 There are no tasks <span className='animate-pulse italic'>yet...</span></p>
            {
              isSession ? (
                <p className='text-lg text-slate-600'>You can create one <Link href="/tasks/new" className='underline text-emerald-500'>there!</Link></p>
              ) : null
            }
          </div>
        ) : (
          <ul className='rounded-lg bg-slate-100'>
            <li className='grid grid-cols-12'>
              <p className='px-2 py-1 text-slate-600 col-span-3'>Title</p>
              <p className='px-2 py-1 text-slate-600 col-span-5'>Description</p>
              <p className='px-2 py-1 text-slate-600 col-span-2 text-center'>Status</p>
              <p className='px-2 py-1 text-slate-600 col-span-1 text-center'>Info</p>
              {
                session.id !== null && (
                  <p className='px-2 py-1 text-slate-600 col-span-1 text-center'></p>
                )
              }
            </li>
            {
              tasks.map(task => <ListItem key={task.id} task={task} />)
            }
          </ul>
        )
      }
    </div>
  )
}

export default TasksList