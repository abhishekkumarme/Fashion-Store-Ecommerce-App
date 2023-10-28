const MailModel = require("../Models/MailModel");
const nodemailer = require('nodemailer');

const dotenv = require('dotenv');

dotenv.config();

//post Mails
const mailPostController = async (req,res) => {
try {
    const {name,from,subject, message} = req.body;

    const mails = await new MailModel({
        name,
        from,
        subject,
        message,
    }).save();
    res.json(mails);
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message: 'Error in Saving mail',
        error,
    })
}
}

// get Mails
const getMailController = async(req,res) => {
try {
    const mails = await MailModel.find({}).sort({createdAt: '-1'});
    res.json(mails);
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"Error while getting mails",
        error,
    })
}
}

// delete Mails
const deleteMailController = async(req,res) => {
try {
    const {mailId} = req.params;
    const mails  = await MailModel.findByIdAndDelete(mailId);
    res.status(200).send({
        success:true,
        message:'Deleted Successfully',
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error While deleting mails',
        error,
    })
}
}


//send mails
const emailController = async(req,res) => {
    try {
        const {to,subject,text} = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MY_EMAIL,
              pass: process.env.MY_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.MY_EMAIL,
            to,
            subject,
            text,
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).send('Error: Could not send email.');
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).send('Email sent successfully.');
            }
          });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in sending mail',
            error,
        })
    }
}

module.exports = {
    mailPostController,
    getMailController,
    deleteMailController,
    emailController,
}