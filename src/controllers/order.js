const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

//@Find order by Id
exports.orderById = async (req, res, id, next) => {
  await Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error || !order) {
        return res.status(400).json({ error: errorHandler(error) });
      }
      req.order = order;
      next();
    });
};

//@Update order status with the enum string - send orderId and status from the front end
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.update(
      { id: req.body.orderId },
      { $set: { status: req.body.status } }
    );
    res.json(order);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

//@Show what is sent from the frontend to create a new order
exports.create = async (req, res) => {
  //@get user before saving order - @req-profile coming from the user db
  req.body.order.user = req.profile;
  const order = await new Order(req.body.order); //@whatever order the user places on the client

  try {
    const data = order.save();
    res.json(data);
    console.log("CREATED NEW ORDER: ", data);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

//@display orders to the client
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "_id name address")
      .sort("-created");
    res.json(orders);
  } catch (error) {
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

//@Display the enum values (created in the order model) to the client
exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};
