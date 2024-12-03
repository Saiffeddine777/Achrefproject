import {Request , Response} from "express"
import  User, { UserInterface } from "./User"
import UserService from "./UserService"
import { UserDTO } from "../DTOs/UserDTOs"
import { CustomExpressRequest } from "../Middlewares/JWTVerification"

type ExpressAPIControllerFunction = (req: Request |CustomExpressRequest , res : Response)  => Promise<void>


interface  UserController {
   postAUser? : ExpressAPIControllerFunction,
   getUsers? : ExpressAPIControllerFunction,
   getOneUser? : ExpressAPIControllerFunction,
   deleteUser? : ExpressAPIControllerFunction,
   updateUser? : ExpressAPIControllerFunction,
   signInUser? : ExpressAPIControllerFunction
   authenticate? : ExpressAPIControllerFunction
}



export default {
   async postAUser(req,res){
     const user  = req.body as UserInterface;
      try {
        const  userInserted   =  await UserService.createAUser(user);
        res.status(200).json(new UserDTO(
          userInserted._id ,
          userInserted.firstName , 
          userInserted.lastName , 
          userInserted.email,
          userInserted.phoneNumber, 
          userInserted.occupation,
          userInserted.address,
          userInserted.role,
          userInserted?.photoUrl,
          userInserted?.photo_id
         ))
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
      }
   },

   async getUsers(req,res){
      try {
         const users = await UserService.findUsers()
         res.status(200).json(users.map((user)=>{
            return new UserDTO(
               user._id ,
               user.firstName , 
               user.lastName , 
               user.email,
               user.phoneNumber,
               user.occupation,
               user.address,
               user.role,
               user?.photoUrl,
               user?.photo_id
              )}))
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
      }
   },

   async getOneUser(req ,res){
     const {id} = req.params
     try {
        const user = await UserService.findAUser(id);
        user ?res.status(200).json(new UserDTO(
         user._id ,
         user.firstName , 
         user.lastName , 
         user.email,
         user.phoneNumber,
         user.occupation,
         user.address,
         user.role,
         user.photoUrl,
         user.photo_id
        )):res.status(404).json({message: "User is not found"}) 
     } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
     }
   },

   async deleteUser(req, res){
    const {id} = req.params
      try {
       const response :string=  await UserService.deleteAUser(id);
       res.status(200).json({message : response})
      } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
      }
   },

   async updateUser(req, res){
    const data = req.body 
    const {id} = req.params
     try {
        const response:string = await UserService.updateUser(id ,data)
        res.status(200).json({message: response})
     } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"Internal Server Error",
            error
        })
     }
   },

   async signInUser(req, res){
      console.log(req.cookies)
      const obj  = req.body as {email :string , password :string}
      try {
         const userIfFound  = await UserService.signInService(obj.email , obj.password);
         if (userIfFound.message){
            res.status(401).json(userIfFound.message)
         }
         else if ("token" in userIfFound) {
            res.status(200).json(userIfFound)
         }
      } catch (error) {
         console.error(error);
         res.status(500).json({
            message:"Internal Server Error",
            error
        })
      }
   },

  async authenticate(req:CustomExpressRequest, res){
   try {
      const decoded = req.decodedToken 
      const user = await  User.findById(decoded?._id).select("-password -__v") 
      res.status(200).json(user)
   }
   catch(error){
      console.error(error);
      res.status(500).json({
         message:"Internal Server Error",
         error
     })
   }
  }
} satisfies  UserController