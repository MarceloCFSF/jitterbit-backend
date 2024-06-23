import Order from "../models/order.model.js";

export default {
  async getAll(_, response) {
    return response.json(await Order.getAll());
  },

  async create(request, response) {
    const body = request.body

    const order = await Order.create({
      orderId: body.numeroPedido,
      value: body.valorTotal,
      creationDate: body.dataCriacao
    })

    return response.json(order);
  }
}