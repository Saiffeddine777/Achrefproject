import nodemailer, { Transporter } from "nodemailer"

const nodeMailerTransporter :Transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

export default nodeMailerTransporter