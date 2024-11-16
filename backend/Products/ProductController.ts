import { Request, Response } from "express";
import ProductService from "./ProductService";
import { ProductInterface } from "./Product";


type ProductControllerFunction = (req: Request , res: Response) => Promise<void>


interface ProductControllerInterface {
     postAProduct ?: ProductControllerFunction,
     getProducts? : ProductControllerFunction,
     getoneProduct? : ProductControllerFunction
     updateOneProduct ? : ProductControllerFunction,
     deleteOneProduct ? : ProductControllerFunction
}


export default {
  async postAProduct(req,res){
      const product = req.body as ProductInterface;
      try {
        const productInserted = await ProductService.createProduct(product)
        res.status(200).json(productInserted)
      } catch (error) {
        res.status(500).json({
            message: "Internal Service Error",
            error
        })   
        throw error;     
      }
  },

  async getProducts(req, res){
      try {
        const products = await ProductService.findAllProducts();
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({
            message: "Internal Service Error",
            error
        })   
        throw error;   
      }
  },

  async getoneProduct(req,res){
     const id  :string= req.params?.id
    try {
       const product =  await ProductService.findOneProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: "Internal Service Error",
            error
        })   
        throw error;   
    }
  },

  async deleteOneProduct(req,res){
    const id  :string= req.params?.id
    try {
        await ProductService.deleteOneProduct(id)
        res.status(200).json({message: `Product with the id of ${id} has been sucessfully deleted`})
    } catch (error) {
        res.status(500).json({
            message: "Internal Service Error",
            error
        })   
        throw error;         
    }
  },

  async updateOneProduct(req,res){
    const id  :string= req.params?.id
    const data = req.body
    try {
       await ProductService.updateOneProduct(id,data)
       res.status(200).json({message : `Product witjh the id of ${id} has been updated` })        
    } catch (error) {
        res.status(500).json({
            message: "Internal Service Error",
            error
        })   
        throw error;   
    }
  }

} satisfies ProductControllerInterface