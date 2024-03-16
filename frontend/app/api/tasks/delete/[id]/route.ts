import axios from "axios"
import { revalidatePath } from "next/cache"

const headers = {
  'Authorization': `${process.env.PRIVATE_TOKEN}`,
  'Content-Type': 'application/json'
};

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const res = await axios.delete(`${process.env.API_URL}/tasks/delete/${params.id}`, {headers})
    .then((res) => {
      console.log('Respuesta', res.data.message)
      return res.data
    })

  revalidatePath('/tasks')
  console.log("res data", res);


  return new Response(JSON.stringify({ res }), { status: 200 })
}
