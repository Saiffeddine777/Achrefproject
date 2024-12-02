
import dotenv from "dotenv"
dotenv.config()
import express, {json , Express} from "express"
import cors from "cors"
import MessageRouter from "./Messages/MessageRouter"
import ProductRouter from "./Products/ProductRouter"
import UserRouter from "./Users/UserRouter"

import cookieParser from "cookie-parser"


const app :Express = express()
const port :number = 4000


app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
}))
app.use (json())
app.use(cookieParser())


app.use("/api/messages", MessageRouter)
app.use("/api/products", ProductRouter)
app.use("/api/users", UserRouter)



app.listen(port, ()=>console.log(`App listening on ${port} !!`))