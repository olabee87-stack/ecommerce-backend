const User = require("../models/user");
const braintree = require("braintree");
require("dotenv").config(); //for the braintree object keys

//@Connect to the braintree with API credentials generated on the braintree site
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//@generate a token for users when there's a request to this route
exports.generateToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};
