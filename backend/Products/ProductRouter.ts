import { Router } from "express";
import ProductController from "./ProductController";
import MulterService from "../APIServices/MulterService";


const ProductRouter :Router = Router()

ProductRouter.post("/create",MulterService.array("files"), ProductController.postAProduct)
ProductRouter.get("/all", ProductController.getProducts)
ProductRouter.get("/one/:id", ProductController.getoneProduct)
ProductRouter.delete("/delete/:id", ProductController.deleteOneProduct)
ProductRouter.put("/update/:id" , ProductController.updateOneProduct)



export default ProductRouter