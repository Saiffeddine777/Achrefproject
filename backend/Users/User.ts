    import mongoose from "../Database";


    export enum Role {
        Admin = "Admin" , User="User" , Developer= "Developer" , Client= "Client"
    }

    export interface UserInterface{
        _id?: string ,
        firstName: string,
        lastName :string,
        email:string,
        phoneNumber:string,
        password :string,
        photoUrl ?: string,
        photo_id ?:string,
        occupation :string,
        address: string,
        role : Role, 
        __v?:number
    }



    const UserSchema = new mongoose.Schema<UserInterface>({
            firstName:{type :String , required : true},
            lastName:{type :String , required :true},
            email:{type:String , required :true},
            phoneNumber:{type:String  , required:true},
            photoUrl:{type:String, required :false},
            password:{type:String , required :true},
            photo_id:{type : String , required :false},
            occupation:{type: String , required : true},
            address :{type :String , required :true},
            role: { type: String, enum: Object.values(Role), required: true}   
        })

    const User = mongoose.model("User",UserSchema)

    export default User;




