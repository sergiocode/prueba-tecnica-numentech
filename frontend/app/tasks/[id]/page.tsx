import TaskData from '@/components/sections/task-data'
import TitleH1 from '@/components/titles/title-h1'
import Link from 'next/link'
import React from 'react'
import { FaCircleArrowLeft } from 'react-icons/fa6'

async function getTask(id: number) {
  const res = await fetch(`${process.env.API_URL}/tasks/${id}`)
  return res.json()
}

export default async function page({ params }: { params: { id: number } }) {
  const task = await getTask(params.id)
  let formattedDate: string = new Date(task.data.task_date).toISOString().slice(0, 16)

  return (
    <div className='my-5 p-3 max-w-screen-sm m-auto'>
      <div className='w-full flex'>
        <Link href="/tasks" className='flex flex-row items-center justify-center gap-1 text-slate-400 hover:text-slate-800'><FaCircleArrowLeft />Volver a tareas</Link>
      </div>
      <div className='my-5 flex flex-row items-center justify-start w-full'>
        <TitleH1 title="Task data" />
      </div>
      <TaskData task={task.data} formatted_date={formattedDate} />
    </div>
  )
}
