import express from "express";

const orderRoutes = express.Router();

orderRoutes.get('/', (_, response) => {
  response.json({ info: 'Get all Orders Route' })
})

export default orderRoutes;