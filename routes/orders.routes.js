const express = require("express");

const ordersController = require("../controllers/orders.controller");

const router = express.Router();

router.post("/", ordersController.addOrder); // /orders

router.post("/cod", ordersController.codAddOrder); // /orders

router.get("/", ordersController.getOrders); // /orders

router.get("/success", ordersController.getSucess);

router.get("/failure", ordersController.getFailure);

router.post("/paid", ordersController.paymentUpdate);

module.exports = router;
