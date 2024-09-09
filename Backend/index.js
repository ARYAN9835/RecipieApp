import express, { text } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.post('/send', async (req,res)=> {
    const {name, email, message} = req.body;
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from : email,
        to : process.env.EMAIL_USER,
        subject : `New experience from ${name}`,
        text : `Email : ${email}\n Message : ${message} `
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ message: "Email sent successfully!" });
        }
      });

})

app.listen(5000, ()=> {
    console.log("app is running on port 5000");
})
