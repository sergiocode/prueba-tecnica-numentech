import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token: string | undefined = request.cookies.get('access-token')?.value

  if (token !== undefined) {
    // Verificamos el token y su fecha de expiración
    // Si ha expirado redirigimos al usuario a / y eliminamos la cookie
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload === null) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      if (payload?.exp !== undefined) {
        if (payload?.exp < currentTime) {
          return NextResponse.redirect(new URL('/login', request.url))
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
  } else {
    // Si token es undefined redirigimos al login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// El middleware se aplicará a los siguientes paths
export const config = {
  matcher: ['/tasks/:path+', '/profile']
}