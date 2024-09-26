import { cookies } from 'next/headers'

const cookieStore = cookies()

export function GetCookie(cookieName: string) {
    return cookieStore.get(cookieName);
  }

export function setCookie(cookieName: string, value: string) {
    let isProduction = false; // TODO: Implement

    if(isProduction){
        cookies().set(cookieName, value, { secure: true });
    } else {
        cookies().set(cookieName, value, { secure: true });
    }
  }

  export function DoesCookieExist(cookieName: string): boolean {
    return cookieStore.has(cookieName);

  }

  export function DeleteCookie(cookieName: string) {
    cookies().delete(cookieName);
  }