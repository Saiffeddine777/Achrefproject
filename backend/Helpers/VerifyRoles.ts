import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"



export const verifyBackOffice: (token: string) => boolean | undefined = (token) => {
    let isBackOffice: boolean | undefined;
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
        if (err) {
            throw err
        }
        typeof payload === "object" && "role" in payload ? isBackOffice = (payload.role === "Admin" || payload.role === "Developer") : isBackOffice = undefined
    })
    return isBackOffice;
}
