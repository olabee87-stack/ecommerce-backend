//@Show what is sent from the frontend to create a new order
exports.create = (req, res) => {
  console.log("CREATE ORDER: ", req.body);
};
