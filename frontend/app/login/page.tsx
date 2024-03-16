import Login from '@/components/forms/login'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-[url("/svg/blurred_bg.svg")] bg-center bg-no-repeat'>
      <div className='flex flex-col justify-center items-center min-h-[calc(100vh-200px)] max-w-screen-2xl m-auto p-3'>
        <div className='flex flex-col gap-5 border rounded-md p-5 w-full sm:w-2/3 lg:w-1/3 bg-white '>
          <h1 className='text-3xl'>🔑 Login</h1>
          <Login />
        </div>
      </div>
    </div>
  )
}

export default page