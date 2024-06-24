import Item from "../models/item.model.js";
import Order from "../models/order.model.js";

export default {
  async getAll(_, response) {
    const orders = await Order.getAll();

    for (const order of orders) {
      await order.connectItems();
    }

    response.json(orders);
  },

  async create(request, response) {
    const body = request.body;

    const order = await Order.create({
      orderId: body.numeroPedido,
      value: body.valorTotal,
      creationDate: body.dataCriacao
    });

    if(!order) {
      return response.status(500).json({message: 'Erro on creating order'});
    }

    for (const item of body.items) {
      await Item.create({
        orderId: order.orderId,
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem,
      }); 
    }
    
    await order.connectItems();
    response.json(order);
  },

  async show(request, response) {
    const order = await Order.get(request.params.order);

    if (!order) {
      response.status(404).json({message: 'Not founded order'});
    } else {
      await order.connectItems();
      response.json(order);
    }
  }
}