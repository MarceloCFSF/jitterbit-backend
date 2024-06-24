import express from "express";
import orderController from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.get('/list', orderController.getAll);
orderRoutes.get('/:order', orderController.show);
orderRoutes.post('/', orderController.create);

export default orderRoutes;