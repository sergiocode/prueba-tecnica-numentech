import ProfileData from '@/components/sections/profile-data'
import TitleH1 from '@/components/titles/title-h1'
import Link from 'next/link'
import React from 'react'
import { FaCircleArrowLeft } from 'react-icons/fa6'
import { cookies } from "next/headers";
import { verifyJwt } from '@/lib/verifyJwt'
import NewUser from '@/components/forms/new-user'

async function getProfile(id: string) {
  const res = await fetch(`${process.env.API_URL}/auth/profile/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `${process.env.PRIVATE_TOKEN}`,
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  })

  return res.json()
}

export default async function page() {
  const cookiesList = cookies()
  const token: string | undefined = cookiesList.get('access-token')?.value

  let session: any = null

  if (token !== undefined) {
    session = await verifyJwt(token)
  }

  const profile = await getProfile(session?.data.id)

  return (
    <div className='my-5 p-3 max-w-screen-sm m-auto'>
      <div className='my-5 p-3 max-w-screen-sm m-auto rounded-lg shadow-md border border-slate-100'>
        <div className='w-full flex'>
          <Link href="/tasks" className='flex flex-row items-center justify-center gap-1 text-slate-400 hover:text-slate-800'><FaCircleArrowLeft />Volver</Link>
        </div>
        <div className='my-3 flex flex-row justify-between w-full'>
          <TitleH1 title='My Profile' />
        </div>
        <ProfileData profile={profile} />
      </div>

      <div className='my-5 p-3 max-w-screen-sm m-auto rounded-lg shadow-md border border-slate-100'>
        <div className='my-3 flex flex-row justify-between w-full'>
          <TitleH1 title='Create new user' />
        </div>
        <NewUser />
      </div>
    </div>
  )
}
