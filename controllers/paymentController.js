const Razorpay = require("razorpay");
const axios = require('axios');
axios.defaults.auth = {
  username: process.env.key_id,
  password: process.env.key_secret,
};
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
async function getPaymentStatus(paymentId) {
  try {
    const response = await axios.get(`https://api.razorpay.com/v1/payments/${paymentId}`);
    const payment = response.data;

    return payment.status; // Return the payment status
  } catch (error) {
    console.error('Error fetching payment details:', error);
  }
}

module.exports = {
  generateRazorpay,
  getPaymentStatus
};
