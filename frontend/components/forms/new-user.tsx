'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Label from '../inputs/label'
import GroupLayout from '../inputs/group-layout'
import InputText from '../inputs/input-text'
import { FaArrowRightToBracket, FaPlus, FaSpinner } from 'react-icons/fa6'
import { number, object, string } from "zod"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Modal from 'react-modal';
import { customStyles } from '@/styles/modal'
import { useSessionHook } from '@/context/SessionContext'
import { encrypt } from '@/lib/crypt'

const SigninSchema = object({
  username: string().min(4),
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
      <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaPlus />Create</div>
    </button>
  )
}


const NewUser = () => {
  const [formData, setFormData] = useState<NewUser>({
    username: "",
    email: "",
    password: "",
    repeat_password: "",
    hashPassword: "",
  })
  const [loading, setLoading] = useState<Loading>({ status: false, message: "" })
  const [openModalError, setOpenModalError] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")

  const [openNotification, setOpenNotification] = useState<boolean>(false)
  const [notification, setNotification] = useState<string>("")

  const { push } = useRouter()

  const handleData = (evt: InputEvent) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const submitData = async (evt: FormEvent) => {
    evt.preventDefault()
    setLoading({ status: true, message: "Creating user" })

    // Validamos el estado formData
    try {
      SigninSchema.parse(formData);
    } catch (error) {
      setErrorMsg("Please check the required fields to create a new task")
      setLoading({ status: false, message: "" })
      return setOpenModalError(true)
    }

    if (formData.password !== formData.repeat_password) {
      setErrorMsg("Passwords do not match")
      setLoading({ status: false, message: "" })
      return setOpenModalError(true)
    }

    try {
      // Encriptamos la contraseña
      const hashPassword = await encrypt(formData.password)
      console.log("hashPassword", hashPassword);

      let data = formData
      data.hashPassword = hashPassword

      const res = await axios.post('/api/auth/createUser', data) // Petición POST a /api/tasks para hacer una llamada del lado del servdor a la API de Flask
        .then(response => {
          if (response.data.status === "failed") {
            setErrorMsg(response.data.message)
            setLoading({ status: false, message: "" })
            return setOpenModalError(true)
          }

          return response.data
        })

      console.log("res", res);

      if (res.status === 'ok') {
        setLoading({ status: false, message: "" })
        setNotification('User created!')
        return setOpenNotification(true)
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
              <Label text='Username' htmlFor='username' />
              <InputText type='text' value={formData.username} placeholder='Enter the username' id='username' name='username' onChange={(evt) => handleData(evt)} />
            </GroupLayout>

            <GroupLayout>
              <Label text='Email' htmlFor='email' />
              <InputText type='email' value={formData.email} placeholder='Enter the email' id='email' name='email' onChange={(evt) => handleData(evt)} />
            </GroupLayout>

            <GroupLayout>
              <Label text='Password (min 6 char)' htmlFor='password' />
              <InputText type='password' value={formData.password} placeholder='Enter the password' id='password' name='password' onChange={(evt) => handleData(evt)} />
            </GroupLayout>

            <GroupLayout>
              <Label text='Repeat password' htmlFor='repeat_password' />
              <InputText type='password' value={formData.repeat_password} placeholder='Repeat the password' id='repeat_password' name='repeat_password' onChange={(evt) => handleData(evt)} />
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
        isOpen={openNotification}
        onRequestClose={() => setOpenNotification(false)}
        style={customStyles}
      >
        <div className='max-w-full p-5'>
          <h1 className='text-slate-700 text-xl text-center'>{notification}</h1>
        </div>
      </Modal>

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

export default NewUser;