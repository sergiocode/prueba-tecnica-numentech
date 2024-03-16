import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export async function verifyJwt(token: string | undefined) {
  if (token !== undefined) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload === null) {
        return redirect('/login')
      }

      if (payload?.exp !== undefined) {
        if (payload?.exp < currentTime) {
          return redirect('/login')
        }
      }
      return { status: true, data: payload }
    } catch (error) {
      console.log("error", error)
      return { status: false }
    }
  }
}