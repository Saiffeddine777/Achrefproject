import { Router } from "express";
import UserController from "./UserController";
import { verifyTokenMiddleware } from "../Middlewares/JWTVerification";


const UserRouter : Router = Router ()



UserRouter.post("/create", UserController.postAUser)
UserRouter.post("/signin", UserController.signInUser)
UserRouter.get("/all" , UserController.getUsers)
UserRouter.get("/one/:id",UserController.getOneUser)
UserRouter.put("/update/:id", UserController.updateUser)
UserRouter.delete("/delete/:id",UserController.deleteUser)
UserRouter.get("/authenticate", verifyTokenMiddleware , UserController.authenticate)



export default UserRouter