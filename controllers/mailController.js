const nodemailer = require("nodemailer");
// const MailGen = require("mailgen");

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// let MailGenerator = new MailGen({
//   theme: "default",
//   product: {
//     name: "Mailgen",
//     link: "https://mailgen.js/",
//   },
// });

// let sendEmailOTP = (email, otpEmail) => {
//   console.log(email);
//   const mailOptions = {
//     to: email,
//     from: "betterbluefc@outlook.com",
//     subject: "Your registration OTP is: ",
//     html:
//       "<h3>Your registration OTP is </h3>" +
//       "<h1 style='font-weight:bold;'>" +
//       otpEmail + //otp email
//       "</h1>", // html body
//   };
//   return transporter.sendMail(mailOptions);
// };

let registerMail = async (req, res) => {
  const { userEmail, otp } = req.body;

  // body of the email
  const mailOptions = {
    to: userEmail,
    from: "betterbluefc@outlook.com",
    subject: "Your registration OTP is: ",
    html:
      "<h3>Your registration OTP is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp + //otp email
      "</h1>", // html body
  };

  // var emailBody = MailGenerator.generate(mailOptions);

  // let message = {
  //   from: ENV.EMAIL,
  //   to: userEmail,
  //   subject: otp || "Signup Successful",
  //   html: emailBody,
  // };

  // send mail
  transporter
    .sendMail(mailOptions)
    .then(() => {
      return res
        .status(200)
        .send({ msg: "You should receive an email from us." });
    })
    .catch((error) => res.status(500).send({ error }));
};

module.exports = {
  // sendEmailOTP,
  registerMail,
};
