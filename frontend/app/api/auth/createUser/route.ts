import axios from "axios"
import { revalidatePath } from "next/cache"

const headers = {
  'Authorization': `${process.env.PRIVATE_TOKEN}`,
  'Content-Type': 'application/json'
};

export async function POST(request: Request) {
  const formData = await request.json()

  console.log("Login API", formData)

  const res = await axios.post(`${process.env.API_URL}/auth/createUser`, formData, { headers })
    .then((res) => {
      console.log('Respuesta', res.data)
      return res.data
    })

  revalidatePath('/tasks')
  //   console.log("res data", res);

  return new Response(JSON.stringify(res), { status: 200 })
}