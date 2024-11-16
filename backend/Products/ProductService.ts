import Product, { ProductInterface } from "./Product";


interface ProductService{
    createProduct? : (product : ProductInterface)=>Promise<any>,
    findAllProducts ?: () => Promise<any>,
    findOneProduct? : (id :string)=>Promise<any>,
    deleteOneProduct ?: (id :string ) => Promise<any>,
    updateOneProduct? : (id :string  , data :Partial<ProductInterface> ) =>Promise<any>
}



export default{
   async createProduct(product){
      try {
        return await Product.create(product)
      } catch (error) {
         console.error(error)
          throw error;
      }
   },

   async findAllProducts(){
      try {
        return await  Product.find();
      } catch (error) {
        console.error(error)
        throw error;
      }
   } ,

   async findOneProduct(id:string){
    try {
        return await Product.findById(id)
    } catch (error) {
        console.error(error)
        throw error;
    }
   },

   async deleteOneProduct(id){
    try {
         await Product.deleteOne({_id :id})
    } catch (error) {
        console.error(error)
        throw error
    }
   },

   async updateOneProduct(id  , data){
     try {
         await Product.updateOne({_id : id} , data)
     } catch (error) {
        console.error(error)
        throw error
     }
   }

}satisfies ProductService