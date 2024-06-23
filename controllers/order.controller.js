import Order from "../models/order.model.js";

export default {
  async getAll(_, response) {
    response.json(await Order.getAll());
  },

  async create(request, response) {
    const body = request.body;

    const order = await Order.create({
      orderId: body.numeroPedido,
      value: body.valorTotal,
      creationDate: body.dataCriacao
    });

    response.json(order);
  },

  async show(request, response) {
    const order = await Order.get(request.params.order);

    if (!order) {
      response.status(404).json({message: 'Not founded order'});
    } else {
      response.json(order);
    }
  }
}