import { Order, CartItem } from "../models/order";
import { errorHandler } from "../helpers/dbErrorHandler";
//const { Order, CartItem } = require("../models/order");

//@Show what is sent from the frontend to create a new order
export function create(req, res) {
  console.log("CREATE ORDER: ", req.body);
}
