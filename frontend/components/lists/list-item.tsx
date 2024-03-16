'use client'
import moment from 'moment';
import React, { useState } from 'react'
import Modal from 'react-modal';
import GroupLayout from '../inputs/group-layout';
import Label from '../inputs/label';
import Link from 'next/link';
import { FaCircleInfo, FaSquareArrowUpRight } from 'react-icons/fa6';
import { customStyles } from '@/styles/modal';
import { useSessionHook } from '@/context/SessionContext';

type Props = {
  task: Task
}

const ListItem = ({ task }: Props) => {
  const [taskData, setTaskData] = useState<Task>(task)
  const [openDetails, setOpenDetails] = useState<boolean>(false)
  const { session, setSession } = useSessionHook();

  const handleModal = () => {
    !openDetails ? setOpenDetails(true) : setOpenDetails(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskData({
      ...taskData,
      description: event.target.value,
    });
  };

  const submitChanges = () => {
    console.log("taskData", taskData)
  }

  return (
    <>
      <li className='grid grid-cols-12 even:bg-white hover:bg-emerald-100 cursor-pointer'>
        <p className='px-2 py-1 text-slate-600 col-span-3 cursor-pointer'>
          <Link href={`/tasks/${taskData?.id}`}>{taskData?.title}</Link>
        </p>
        <p className='px-2 py-1 text-slate-600 col-span-5 cursor-text font-light'>{taskData?.description}</p>
        <p className='px-2 py-2 text-slate-600 col-span-2 cursor-pointer text-center text-xs'>
          {
            !taskData?.finished ? (
              <span className='bg-red-700 text-white rounded-md px-1'>Not finished</span>
            ) : (
              <span className='bg-green-600 text-white rounded-md px-1'>Finished</span>
            )
          }
        </p>
        {/* <p className='px-2 py-1 text-slate-600 col-span-1 cursor-pointer font-light'>{taskData?.creator_username}</p> */}
        {/* <p className='px-2 py-1 text-slate-600 col-span-2 cursor-pointer font-light'>{moment.utc(taskData?.task_date).format('DD/MM/YYYY HH:mm')}</p> */}
        <p className='px-2 py-1 text-slate-600 col-span-1 cursor-pointer text-center flex justify-center items-center'
          onClick={handleModal}>
          <FaCircleInfo className='hover:bg-slate-800 hover:text-white rounded-full p-1 text-2xl' />
        </p>
        {
          session.id !== null && (
            <Link href={`/tasks/${taskData?.id}`} className='px-2 py-1 text-slate-600 col-span-1 cursor-pointer text-center flex justify-center items-center'>
              <FaSquareArrowUpRight className='hover:bg-slate-800 hover:text-white rounded-full p-1 text-2xl' />
            </Link>
          )
        }
      </li>

      <Modal
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        style={customStyles}
      >
        <div className='w-[500px] md:w-[700px] p-3'>
          <h1 className='text-slate-700 text-xl'>TAREA</h1>
          <GroupLayout>
            <Label text='Title' htmlFor='title' />
            <input
              type="text"
              disabled
              value={taskData.title}
              className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1' />
          </GroupLayout>
          <GroupLayout>
            <Label text='Description' htmlFor='description' />
            <textarea
              disabled
              value={taskData.description}
              className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1' />
          </GroupLayout>

          <GroupLayout>
            <Label text='Created by' htmlFor='description' />
            <input
              type="text"
              disabled
              value={taskData.creator_username}
              className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1' />
          </GroupLayout>

          <GroupLayout>
            <Label text='Date' htmlFor='description' />
            <input
              type="text"
              disabled
              value={moment.utc(taskData?.task_date).format('DD/MM/YYYY HH:mm')}
              className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1' />
          </GroupLayout>

          <div className='flex flex-row items-center gap-3'>
            <Label text='Status' htmlFor='status' />
            <p className='text-slate-600 col-span-2 cursor-pointer text-xs'>
              {
                !taskData?.finished ? (
                  <span className='bg-red-700 text-white rounded-md px-1'>Not finished</span>
                ) : (
                  <span className='bg-green-600 text-white rounded-md px-1'>Finished</span>
                )
              }
            </p>
          </div>

          <button onClick={submitChanges}></button>
        </div>
      </Modal>
    </>
  )
}

export default ListItem