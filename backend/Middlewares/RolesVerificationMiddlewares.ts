import { verifyBackOffice } from "../Helpers/VerifyRoles";
import { Request , Response } from "express";

export const isBackOffice :(req:Request , res:Response , next:any)=>Promise <void> = async(req, res , next)=>{
    const token = req.cookies.token
    try {
        if (verifyBackOffice(token)){
            next()
        }
        res.status (401).json({message: "User does not have the designated role"})
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message : "Internal Server Error", 
            error
        })
    }
}