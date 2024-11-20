import nodemailer, { Transporter } from "nodemailer"

const nodeMailerTransporter :Transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "qqqeee155@gmail.com",
        pass: "swt123@@@"
    }
})

export default nodeMailerTransporter