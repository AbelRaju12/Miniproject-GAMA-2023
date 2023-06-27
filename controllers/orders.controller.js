const stripe = require("stripe")(
  "sk_test_51ND7VGSIQiM20eaESXJj9emcyIQKDIwMjlN97pld7nNyKJGBeThL5CYBtB28GqSWQ9fdq82Jt4lTAZ6ZZStHK5UY00rKddCuhT"
);

const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }
  let tempCart = [];
  cart.items.map(async (item) => {
    tempCart.push(item.product.id);
  });

  req.session.cart = null;
  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map(function (item) {
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:3000/orders/success?cart=${JSON.stringify(
      tempCart
    )}`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
}

function getSucess(req, res) {
  let cart = JSON.parse(req.query.cart);
  cart.map(async (item) => {
    try {
      let product = await Product.findById(item);
      await product.remove();
    } catch (error) {
      console.log(error);
    }
  });
  res.render("customer/orders/success");
}

function getFailure(req, res) {
  res.render("customer/orders/failure");
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSucess: getSucess,
  getFailure: getFailure,
};
