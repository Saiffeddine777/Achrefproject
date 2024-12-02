

export interface CookieManagement{
    setCookie : (name:string , value :string, days:number )=> void,
    removeCookie : (name :string) => void
}


export default {
    setCookie(name, value, days) {
         const date = new Date()
         date.setTime(date.getTime() + (days * 24 * 60 * 60* 1000 ))   
         document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path="/";`
    },

    removeCookie(name) {
         document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    },
} satisfies CookieManagement


