import express, {json , Express} from "express"
import dotenv from "dotenv"
import cors from "cors"
import MessageRouter from "./Messages/MessageRouter"
import ProductRouter from "./Products/ProductRouter"
dotenv.config()


const app :Express = express()
const port :number = 4000


app.use(cors())
app.use (json())


app.use("/api/messages", MessageRouter)
app.use("/api/products", ProductRouter)



app.listen(port, ()=>console.log(`App listening on ${port} !!`))