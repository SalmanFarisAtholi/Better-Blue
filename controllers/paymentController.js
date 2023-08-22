const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

async function generateRazorpay(newTicketId, totalPrice, next) {
  try {
    return new Promise((resolve, reject) => {
      var options = {
        amount: totalPrice * 100,
        receipt: "" + newTicketId,
        currency: "INR",
        payment_capture: "0",
      };
      instance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err);
        } else {
          console.log("New order",order);
          resolve(order);
        }
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  generateRazorpay,
};

// verifyPayment: (req, res, next) => {
//   try {
//     console.log("VerifyPayment running");
//     const body = req.body;

//     userHelpers
//       .verifyPayment(body)
//       .then(() => {
//         console.log(body.order.receipt);
//         console.log(req.body);
//         var orderId = body.order.receipt;

//         userHelpers.changePaymentStatus(orderId).then(() => {
//           console.log("Payment successful");
//           res.json({ status: true });
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.json({ status: false });
//       });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }
