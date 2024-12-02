import { encryptPassword, verifyPassword } from "../Helpers/BcryptHelper";
import { generateToken } from "../Helpers/JWTGenerator";
import User, { UserInterface } from "./User";

export interface UserService {
    createAUser?: (user: UserInterface) => Promise<any>,
    findUsers?: () => Promise<any>,
    findAUser?: (_id: string) => Promise<any>,
    deleteAUser?: (_id: string) => Promise<string>,
    updateUser?: (_id: string, data: UserInterface) => Promise<string>
    signInService: (email: string, password: string) => Promise<any>
}

export default {
    async createAUser(user) {
        try {
            const newPassword: string = await encryptPassword(user.password);
            user.password = newPassword
            return await User.create(user)
        } catch (error) {
            console.error(error);
            throw new Error("Error occured while creating User")
        }
    },

    async findUsers() {
        try {
            return await User.find()
        } catch (error) {
            console.error(error)
            throw new Error("Error getting Users")
        }
    },

    async findAUser(_id) {
        try {
            return await User.findById(_id)
        } catch (error) {
            console.error(error)
            throw new Error("Error geeting User with the id " + _id + ".")
        }
    },

    async deleteAUser(_id) {
        try {
            await User.deleteOne({ _id: _id })
            return `User with the id of ${_id} has been deleted`
        } catch (error) {
            console.error(error)
            throw new Error("Error deleting the id")
        }
    },

    async updateUser(_id, data) {
        try {
            await User.updateOne({ _id: _id }, data)
            return `User with the id of ${_id} has been udpated`
        } catch (error) {
            console.error(error)
            throw new Error("Error updating the id")
        }
    },

    async signInService(email, password) {
        try {
            const user = await User.findOne({ email: email })
            if (!user) {
                return { message: "User With this email is not found" };
            }
            const validPassword: boolean = await verifyPassword(password, user?.password as string)
            if (validPassword) {
                const specialDto = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phonNumber: user.phoneNumber,
                    occupation: user.occupation,
                    address: user.address,
                    role: user.role,
                    photoUrl: user?.photoUrl,
                    photo_id: user?.photo_id
                }
                const token: string = generateToken(specialDto)
                return { ...specialDto, token } 
            }
            else {
                return { message: "Wrong password" }
            }

        } catch (error) {
            console.error(error)
            throw new Error("Error Signing In")
        }
    }

} satisfies UserService