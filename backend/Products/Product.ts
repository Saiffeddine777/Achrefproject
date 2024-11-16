import { Schema } from "mongoose";
import mongoose from "../Database";

export interface ProductInterface{
    _id? : string,
    name : string ,
    description:string,
    numberOfPieces:number,
    photos :string[] ,
    price: number,
    __v?:number
}    

const ProductSchema : Schema = new mongoose.Schema<ProductInterface>({
     name :{type : String , required : true},
     description:{type :String , required :true},
     numberOfPieces :{type : Number , required : true},
     photos:{type:[String] , required:true , default: [""]},
     price:{type:Number , requried :true }
}) 

const Product  = mongoose.model("Product", ProductSchema)


export default Product