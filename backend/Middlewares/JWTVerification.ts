import { verifyToken } from "../Helpers/JWTGenerator";
import { Request , Response } from "express";


export interface CustomExpressRequest extends Request {
   decodedToken? : any
}

export const verifyTokenMiddleware :(req:CustomExpressRequest , res : Response , next:any) => Promise <void> = async (req, res, next)=>{
   const token = req.cookies.token
   try {
   const response = verifyToken(token)
      if (response.exp){
         req.decodedToken = response
         next()
      }
   } catch (error) {
      res.status(500).json({
         message:"Internal Server Error",
         error
   })
   }  
}