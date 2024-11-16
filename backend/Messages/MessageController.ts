import { Request, Response } from "express";
import MessageService from "./MessageService";
import { MessageInterface } from "./Message";


type ControllerFunctionType = (req:Request,res:Response) =>Promise<void>
interface MessageController{
    postAmessage?: ControllerFunctionType,
    getMessages ? : ControllerFunctionType,
    getOneMessage? :ControllerFunctionType
    putOneMessage? : ControllerFunctionType,
    deleteOneMessage? : ControllerFunctionType
 }





export default {
    async postAmessage(req, res){
        try {
        const data = req.body as MessageInterface
         const message = await MessageService.createMessage(data)
         res.status(202).json(message)
        } catch (error) {
            res.status(500).json({
                message : "Internal server error ",
                error
            })
            throw error
        }
    },


    async getMessages (req, res){
        try{
            const Messages  = await MessageService.getMessages()
            res.status(200).json(Messages);
        }catch(error){
            res.status(500).json({
                message : "Internal server error ",
                error
            })
           throw error;
        }
    },


    async getOneMessage(req,res){
         const id :string = req.params?.id
        try{
          const message = await MessageService.getOneMessage(id);
          res.status(200).json(message)
        }
        catch(error){ 
            res.status(500).json({
                message : "Internal server error ",
                error
            })
            throw error ;

        }
    },

    async putOneMessage (req, res){
        const data  = req.body
        const id = req.params?.id
       try {
        await MessageService.updateOneMessage(id , data)
         res.status(200).json({message : `Message with the ${id} has been updated`})
       } catch (error) {
        res.status(500).json({
            message : "Internal server error ",
            error
        })
        throw error ;
       }
    }, 

    async deleteOneMessage(req , res){
        const id :string = req.params.id
        try {
            await MessageService.deleteOneMessage(id);
            res.status(200).json({message: `Message withe the id ${id} has been deleted`})
        } catch (error) {
            res.status(500).json({
                message : "Internal server error ",
                error
            })
            throw error ;   
        }
    }


    
} satisfies MessageController