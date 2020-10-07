import { Order, CartItem } from "../models/order";
import { errorHandler } from "../helpers/dbErrorHandler";

//@Show what is sent from the frontend to create a new order
exports.create = async (req, res) => {
  //console.log("CREATE ORDER: ", req.body);
  //@get user before saving order - @req-profile coming from the user db
  req.body.order.user = req.profile;
  const order = await new Order(req.body.order); //@whatever order the user places on the client

  try {
    const data = order.save();
    res.json(data);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};
