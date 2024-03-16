'use client'
import React from 'react'
import Label from '../inputs/label';
import { FaDoorOpen } from 'react-icons/fa6';
import logout from '../../app/actions/logout'

interface Profile {
  id: string;
  username: string;
  email: string;
}
type Props = {
  profile: Profile;
}

const ProfileData = ({ profile }: Props) => {
  const handleLogout = async () => {
    await logout()
    location.reload()
  }
  return (
    <ul className='my-5 max-w-screen-sm m-auto flex flex-col gap-3'>
      <div className='flex flex-col'>
        <Label text='ID' htmlFor='id' />
        <div className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1'>{profile.id}</div>
      </div>
      <div className='flex flex-col'>
        <Label text='Username' htmlFor='username' />
        <div className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1'>{profile.username}</div>
      </div>
      <div className='flex flex-col'>
        <Label text='Email' htmlFor='email' />
        <div className='border rounded-lg p-2 font-light focus-visible:outline outline-emerald-500 outline-offset-1 outline-1'>{profile.email}</div>
      </div>
      <div className='flex flex-row justify-end mt-3'>
        <button
          type='button'
          onClick={handleLogout}
          className='p-[1px] bg-gradient-to-tr from-amber-500 to-red-500 rounded-md outline-none w-fit'>
          <div className='flex flex-row justify-center items-center gap-2 text-white hover:text-slate-700 bg-white/10 hover:bg-white/80 rounded-[5px] p-2'><FaDoorOpen />Log out</div>
        </button>
      </div>
    </ul>
  )
}

export default ProfileData