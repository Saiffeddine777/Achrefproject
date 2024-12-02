
import { Role } from "../Users/User";

export class UserDTO {
    _id !:string
    firstName !: string;
    lastName !:string;
    email! :string;
    phoneNumber!:string;
    photoUrl !: string |undefined;
    photo_id !:string |undefined;
    occupation ! :string;
    address !: string;
    role !: Role; 

    constructor(  
        _id :string,
        firstName : string,
        lastName :string,
        email :string,
        phoneNumber:string,
        occupation  :string,
        address : string,
        role : Role ,
        photoUrl? : string,
        photo_id ?:string,    
    ){
        
            this._id = _id
            this.firstName = firstName
            this.lastName = lastName
            this.email = email ;
            this.phoneNumber = phoneNumber
            this.occupation = occupation;
            this.address = address;
            this.role = role
            photoUrl? this.photoUrl = photoUrl: undefined
            photo_id? this.photo_id = photo_id: undefined
    }
}