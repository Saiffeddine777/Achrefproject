import MessageController from "./MessageController";
import { Router } from "express";


const MessageRouter : Router = Router()


MessageRouter.post("/create", MessageController.postAmessage)
MessageRouter.get("/all" , MessageController.getMessages)
MessageRouter.get("/one/:id", MessageController.getOneMessage)
MessageRouter.put("/update/:id", MessageController.putOneMessage)
MessageRouter.delete("/delete/:id", MessageController.deleteOneMessage)

export default MessageRouter;