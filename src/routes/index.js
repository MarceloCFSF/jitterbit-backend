import express from "express";
import orderRoutes from "./orders.route.js";

const router = express.Router();

router.get('/', (_, response) => {
  response.json({ info: 'Jitterbit API' })
})
router.use('/order', orderRoutes);

export default router;