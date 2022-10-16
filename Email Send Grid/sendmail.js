// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('')

const fs = require("fs");

// const attachment = fs.readFileSync("FeedbackReport-AayushPatel.pdf").toString("base64");

const msg = {
  to: 'aaryan2134@gmail.com', // Change to your recipient
  from: 'aaryan2134@gmail.com', // Change to your verified sender
  subject: 'Great! Task is completed',
  text: 'Hi, Please find the update regarding your children task.\n Name: Aayush Patel \n Task: Utensils Cleaning \n Work Place: Kitchen\n Task has been completed for 20 Points \n \n Regards, \n Woody On Mission \n www.woodyonmission.co\n',
  // attachments: [
  //   {
  //     content: attachment,
  //     filename: "FeedbackReport-AayushPatel.pdf",
  //     type: "application/pdf",
  //     disposition: "attachment"
  //   }
  // ]
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })