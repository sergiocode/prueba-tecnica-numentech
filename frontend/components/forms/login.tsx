'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Label from '../inputs/label'
import GroupLayout from '../inputs/group-layout'
import InputText from '../inputs/input-text'
import { FaArrowRightToBracket, FaSpinner } from 'react-icons/fa6'
import { number, object, string } from "zod"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Modal from 'react-modal';
import { customStyles } from '@/styles/modal'
import { useSessionHook } from '@/context/SessionContext'

const LoginSchema = object({
  email: string().email(),
  password: string().min(6),
});

interface InputEvent {
  target: HTMLInputElement & {
    name: string;
    value: string;
  };
}

export function SubmitButton() {
  return (
    <button type='submit' className='p-[1px] bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-md outline-none w-full'>
      <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaArrowRightToBracket />Enter</div>
    </button>
  )
}


const Login = () => {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState<Loading>({ status: false, message: "" })
  const [openModalError, setOpenModalError] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")
  const { session, setSession } = useSessionHook();

  const { push } = useRouter()

  useEffect(() => {
    if (session.id !== null) {
      push('/tasks')
    }
  }, [session])

  const handleData = (evt: InputEvent) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const submitData = async (evt: FormEvent) => {
    evt.preventDefault()
    setLoading({ status: true, message: "Checking credentials" })

    // Validamos el estado formData
    try {
      LoginSchema.parse(formData);
    } catch (error) {
      setErrorMsg("Please check the required fields to create a new task")
      setLoading({ status: false, message: "" })
      return setOpenModalError(true)
    }

    try {
      const res = await axios.post('/api/auth/login', formData) // Petición POST a /api/tasks para hacer una llamada del lado del servdor a la API de Flask
        .then(response => {
          if (response.data.status === "failed") {
            setErrorMsg(response.data.message)
            setLoading({ status: false, message: "" })
            return setOpenModalError(true)
          }

          return response.data
        })

      if (res.status === 'ok') {
        location.reload()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        !loading.status ? (
          <form onSubmit={submitData} className='w-full'>
            <GroupLayout>
              <Label text='Email' htmlFor='email' />
              <InputText type='email' value={formData.email} placeholder='Enter your email' id='email' name='email' onChange={(evt) => handleData(evt)} />
            </GroupLayout>

            <GroupLayout>
              <Label text='Password' htmlFor='password' />
              <InputText type='password' value={formData.password} placeholder='Enter your password' id='password' name='password' onChange={(evt) => handleData(evt)} />
            </GroupLayout>

            <SubmitButton />
          </form>
        ) : (
          <div className='w-full flex flex-col gap-5 justify-center items-center'>
            <FaSpinner className='animate-spin text-5xl text-green-500' />
            <p className='text-slate-700'>{loading.message}</p>
          </div>
        )
      }

      <Modal
        isOpen={openModalError}
        onRequestClose={() => setOpenModalError(false)}
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

export default Login;