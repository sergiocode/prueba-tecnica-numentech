import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const formData = await request.json()

  const res = await axios.post(`${process.env.API_URL}/auth/login`, formData)
    .then((res) => {
      console.log('Respuesta', res.data)
      if (res.data.status === 'ok') {

      }
      return res.data
    })

  revalidatePath('/')
  cookies().set({
    name: 'access-token',
    value: res.jwt,
    httpOnly: true,
    path: '/',
  })

  return new Response(JSON.stringify(res), {
    status: 200
  })
}