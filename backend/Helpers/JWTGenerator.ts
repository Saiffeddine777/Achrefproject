import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"



export const generateToken : (user:object)=>string  = (user)=>{
       return jwt.sign(user  , process.env.JWT_SECRET as string ,{expiresIn:"24h"})      
}


export const verifyToken :(token : string) =>jwt.JwtPayload  = (token)=>{
          let decoded :jwt.JwtPayload |undefined |string ={} 
          jwt.verify(token , process.env.JWT_SECRET as string , (err , decode )=>{
             if (err){
              throw err
             }
             else decoded = decode
          })

   return decoded
     
}


