const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.EtheralUser,
        pass: process.env.EtheralPass
    },
  });
  
const sender = {
    email : "hackathonsupport@gmail.com",
    name : "hackathonSMIT"
} 
module.exports = {transporter , sender}