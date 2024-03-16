import TasksList from '@/components/lists/tasks-list'
import TitleH1 from '@/components/titles/title-h1'
import Link from 'next/link'
import React from 'react'
import { cookies } from 'next/headers'
import { FaSquarePlus } from 'react-icons/fa6'
import { verifyJwt } from '@/lib/verifyJwt'

type Props = {}

async function getTasks() {
  const res = await fetch(`${process.env.API_URL}/tasks`)

  return res.json()
}

export default async function page(props: Props) {
  const tasks = await getTasks()

  return (
    <div className='max-w-screen-2xl m-auto p-3'>
      <TasksList tasks={tasks} />
    </div>
  )
}
