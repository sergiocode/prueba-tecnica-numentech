import axios from "axios"
import { revalidatePath } from "next/cache"

const headers = {
  'Authorization': `${process.env.PRIVATE_TOKEN}`,
  'Content-Type': 'application/json'
};

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const taskData = await request.json()

  const res = await axios.put(`${process.env.API_URL}/tasks/modify/${params.id}`, taskData, { headers })
    .then((res) => {
      console.log('Respuesta', res.data.message)
      return res.data
    })

  revalidatePath('/tasks')
  revalidatePath(`/tasks/${taskData.id}`)
  console.log("res data", res);


  return new Response(JSON.stringify({ res }), { status: 200 })
}
