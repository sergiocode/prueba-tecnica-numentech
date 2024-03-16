'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Label from '../inputs/label'
import GroupLayout from '../inputs/group-layout'
import InputText from '../inputs/input-text'
import { FaSpinner, FaSquarePlus } from 'react-icons/fa6'
import axios from 'axios'
import InputTextarea from '../inputs/input-textarea'
import InputDatetime from '../inputs/input-datetieme'
import { number, object, string } from "zod"
import Modal from 'react-modal';
import { useRouter } from 'next/navigation'
import { customStyles } from '@/styles/modal'
import { useSessionHook } from '@/context/SessionContext'

type EmptyTask = {
  title: string;
  id_creator: string | null;
  description: string;
  task_date: string;
}

const TaskSchema = object({
  title: string().min(1), // Revisamos que title no esté vacío
  description: string(),   // No revisamos si hay descripción (no obligatoria)
  task_date: string().min(1), // Revisamos que task_date no esté vacío
});


export function SubmitButton() {
  return (
    <button type='submit' className='p-[1px] bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-md outline-none w-fit'>
      <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaSquarePlus />Create</div>
    </button>
  )
}


const NewTask = () => {
  const [formData, setFormData] = useState<EmptyTask>({
    title: "",
    id_creator: null,
    description: "",
    task_date: "",
  })
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [modalError, setModalError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { session, setSession } = useSessionHook();

  const { push } = useRouter()

  // Manejamos los cambios del estado formData
  const handleData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }


  const submitData = async (evt: FormEvent) => {
    evt.preventDefault()
    setLoading(true)

    // Validamos el estado formData para comprobar si se han rellenado los campos obligatorios
    try {
      TaskSchema.parse(formData);
    } catch (error) {
      console.log("error", error)
      setErrorMsg("Please review the required fields to create a new task")
      setLoading(false)
      return setModalError(true)
    }

    let data = formData
    data.id_creator = session.id

    await axios.post('/api/tasks', formData) // Petición POST a /api/tasks para hacer una llamada del lado del servdor a la API de Flask
      .then((res) => {
        console.log("RES -> ", res)

        if (res.status === 200) {
          return push(`/tasks/${res.data.res.id}`) // Redirect a la página de la tarea
        } else {
          setLoading(false)
        }
      })
  }

  return (
    <>
      {
        !loading ? (
          <form onSubmit={submitData}>
            <GroupLayout>
              <Label text='Title*' htmlFor='title' />
              <InputText type='text' value={formData.title} placeholder='Task title' id='title' name='title' onChange={handleData} />
            </GroupLayout>

            <GroupLayout>
              <Label text='Description' htmlFor='description' />
              <InputTextarea value={formData.description}
                placeholder='Enter the description'
                id='description'
                name='description'
                onChange={handleData}
              />
            </GroupLayout>

            <GroupLayout>
              <Label text='Task date*' htmlFor='task_date' />
              <InputDatetime value={formData.task_date}
                id='task_date'
                name='task_date'
                onChange={handleData}
              />
            </GroupLayout>

            <div className='flex flex-row justify-end'>
              <SubmitButton />
            </div>
          </form>
        ) : (
          <div className='w-full flex flex-col gap-5 justify-center items-center h-[calc(100vh-300px)]'>
            <FaSpinner className='animate-spin text-5xl text-green-500' />
            <p className='text-slate-700'>Creating task...</p>
          </div>
        )
      }

      <Modal
        isOpen={modalError}
        onRequestClose={() => setModalError(false)}
        style={customStyles}
      >
        <div className='max-w-full p-5'>
          <h1 className='text-slate-700 text-xl text-center'>⚠️ Error</h1>
          <p className='text-slate-700'>{errorMsg}</p>
        </div>
      </Modal>
    </>
  )
}

export default NewTask;