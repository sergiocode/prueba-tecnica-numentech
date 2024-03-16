'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import GroupLayout from '../inputs/group-layout';
import InputText from '../inputs/input-text';
import Label from '../inputs/label';
import InputTextarea from '../inputs/input-textarea';
import InputDatetime from '../inputs/input-datetieme';
import { FaFilePen, FaSpinner, FaTrash } from 'react-icons/fa6';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  task: Task;
  formatted_date: string;
}

const TaskData = ({ task, formatted_date }: Props) => {
  const [taskData, setTaskData] = useState<Task>({ ...task, task_date: formatted_date });
  const [loading, setLoading] = useState<Loading>({ status: false, message: "Task is being deleted" })

  const { push } = useRouter()

  // Manejamos los cambios del estado taskData
  const handleData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value })
  }

  const submitDelete = async (id: number) => {
    setLoading({ status: true, message: "Task is being deleted" })

    await axios.delete(`/api/tasks/delete/${id}`)
      .then((res) => {
        console.log("RES -> ", res)

        if (res.status === 200) {
          return push('/tasks') // Redirect a la página de la tarea
        } else {
          setLoading({ status: false, message: "" })
        }
      })
  }

  const submitModify = async (id: number) => {
    setLoading({ status: true, message: "The task is being modified" })

    await axios.put(`/api/tasks/modify/${id}`, taskData)
      .then((res) => {
        if (res.status === 200) {
          return setLoading({ status: false, message: "" })
        }
      })
  }


  const consola = () => {
    console.log("taskData", taskData)
  }

  return (
    <ul className='my-5 p-3 max-w-screen-sm m-auto rounded-lg shadow-md border border-slate-100'>
      {
        !loading.status ? (
          <div className='flex flex-col gap-3'>
            <GroupLayout>
              <Label text='ID' htmlFor='id' />
              <input disabled type='text' value={String(taskData.id)} className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1' />
            </GroupLayout>
            <GroupLayout>
              <Label text='Created by' htmlFor='creator_username' />
              <input disabled type='text' value={taskData.creator_username} className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1' />
            </GroupLayout>
            <GroupLayout>
              <Label text='Title*' htmlFor='title' />
              <InputText type='text' value={taskData.title} placeholder='Task title' id='title' name='title' onChange={handleData} />
            </GroupLayout>
            <GroupLayout>
              <Label text='Description' htmlFor='description' />
              <InputTextarea value={taskData.description} placeholder='Task description' id='description' name='description' onChange={handleData} />
            </GroupLayout>

            <GroupLayout>
              <Label text='Task date*' htmlFor='task_date' />
              <InputDatetime
                id="task_date"
                name="task_date"
                value={taskData.task_date}
                onChange={handleData}
              />
            </GroupLayout>

            <GroupLayout>
              <Label text='Status' htmlFor='finished' />
              <select
                value={String(taskData.finished)}
                id='finished'
                name='finished'
                onChange={handleData}
                className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1'
              >
                <option value={1}>🟢 Finished</option>
                <option value={0}>🔴 Not finished</option>
              </select>
            </GroupLayout>

            <br />

            <div className='flex flex-row justify-end items-center gap-2'>
              <button
                type='button'
                onClick={() => submitDelete(taskData.id)}
                className='p-[1px] bg-gradient-to-tr from-amber-500 to-red-500 rounded-md outline-none w-fit'>
                <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaTrash />Delete</div>
              </button>

              <button
                type='button'
                onClick={() => submitModify(taskData.id)}
                className='p-[1px] bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-md outline-none w-fit'>
                <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaFilePen />Modify</div>
              </button>
            </div>
          </div>
        ) : (
          <div className='w-full flex flex-col gap-5 justify-center items-center h-[calc(100vh-300px)]'>
            <FaSpinner className='animate-spin text-5xl text-green-500' />
            <p className='text-slate-700'>{loading.message}</p>
          </div>
        )
      }


      {/* <button onClick={consola}>CONSOLA</button> */}
    </ul>
  )
}

export default TaskData