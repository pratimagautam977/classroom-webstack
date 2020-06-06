const nodemailer = require("nodemailer");


async function sendMail(output, email, subject){


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: 'mail.traversymedia.com',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.user, // generated ethereal user
        pass: process.env.pass, // generated ethereal password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
    });

    // send mail with defined transport object
    let mailOptions = {
    from: '"Classroom WebStack" <tikawatigautam@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render("contact", { msg: "Email has been sent" });
    });

}
module.exports = sendMail;