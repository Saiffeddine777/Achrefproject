import dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt"


export const encryptPassword : (password : string )=>Promise<string> = async (password)=>{
    try {
        const salt =  await bcrypt.genSalt(Number(process.env.SALT))
        return await bcrypt.hash(password, salt)
    } catch (error) {
        console.error(error)
        throw new Error("Error Encrupting Password")
    }
}

export const verifyPassword : (passwordEntered : string , hashedPassword :string )=>Promise<boolean> = async(passwordEntered , hashedPassword)=>{
    try {   
         return await bcrypt.compare(passwordEntered, hashedPassword)
    } catch (error) {
        console.error(error)
        throw new Error("Error verifiying Password")
    }
}