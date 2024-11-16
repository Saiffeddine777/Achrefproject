import Message, { MessageInterface } from "./Message";



interface MessageService {
    createMessage ?: (data:MessageInterface)=> Promise<any>,
    getMessages?  : ()=>Promise<any>,
    getOneMessage? : (id :string)=>Promise<any>,
    deleteOneMessage? :(id :string) =>Promise<void>,
    updateOneMessage? : (id :string , data :Partial<MessageInterface>) =>Promise<any>
}




export default{
    async createMessage(data){
        try {   
          return await Message.create(data);;
        } catch (error) {
         console.error(error)
         throw error  
        }
    },
    

    async getMessages () {
        try {
            return await Message.find()
        } catch (error) {
            console.error(error)
            throw error;
        }
    } ,


    async getOneMessage(id) {
        try {
            return await Message.findById(id);
        } catch (error) {
            console.error(error)
            throw error ;
        }
    },

    async deleteOneMessage(id){
        try {
           await Message.deleteOne({_id :id})
        } catch (error) {
            console.error(error);
            throw error
        }
    },

    async updateOneMessage(id ,data){
        try {
          await Message.updateOne({_id : id} , data)
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    
} satisfies MessageService