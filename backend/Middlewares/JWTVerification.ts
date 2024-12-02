import { verifyToken } from "../Helpers/JWTGenerator";
import { Request , Response } from "express";



export const verifyTokenMiddleware :(req:Request , res : Response , next:any) => Promise <void> = async (req, res, next)=>{
    const token = req.headers["authorization"] as string
   try {
     const response = verifyToken(token)
      if (response.exp){
         next()
      }
   } catch (error) {
      res.status(500).json({
         message:"Internal Server Error",
         error
     })
   }  
}