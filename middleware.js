// middleware.ts
import { NextResponse } from 'next/server'

export async function middleware(request) {
   const token = request.cookies.get('access_token')?.value

   if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   // Verificar si la ruta solicitada es dashboard
   const parametros = request.nextUrl.pathname.includes('/dashboard');
   if (parametros) {
      const isValidToken = await fetchValidatToken(token)
      
      if(!isValidToken) return NextResponse.redirect(new URL('/login', request.url));
   }

   return NextResponse.next()
}
// Se Define las rutas en las que deseas que el middleware se aplique
export const config = {
   matcher: ['/dashboard/:path*'],
}


const fetchValidatToken = async (token) => {
   try {
      const response = await fetch('https://testautocookie.onrender.com/api/token/verify/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            token: token
         })
      })
      const data = await response.json()
      console.log(data);
      if (!response.ok) {
         return false
      }
      
      if (response.status === 200) {
         return true
      }
   } catch (error) {
      return false
   }
}


