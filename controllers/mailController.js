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

let ticketMail = async (updatedTicket) => {
  // console.log(updatedTicket);
 

  const{total,_id,stand,userId,members}=updatedTicket
    const userEmail=userId.email;
    let memberDetailsHTML = "";
members.forEach((member, index) => {
  memberDetailsHTML += `
    <h3>Member ${index + 1}</h3>
    <p>Name: ${member.name}</p>
    <p>Email: ${member.mobileNumber}</p>
    <hr />
  `;
});
  const mailOptions = { 
    to: userEmail,
    from: "betterbluefc@outlook.com",
    subject: "You'r Match Ticket is Ready",
    html:
      "<h3>Your Ticket Number is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      _id + 
      "</h1>"+
      `<p>Total: ${total}</p>` + 
      `<p>Stand: ${stand}</p>` + 
      memberDetailsHTML,
  };
  transporter
    .sendMail(mailOptions)
    .then(() => {
       return  "You should receive an email from us.";
    })
    .catch((error) => {
      console.log('!!!!',error);
      return error ;
})
}
module.exports = {
  // sendEmailOTP,
  registerMail,
  ticketMail
};
