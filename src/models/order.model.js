import database from "../services/database.js";
import Item from "./item.model.js";

class Order {
  constructor(row) {
    this.orderId = row.orderId;
    this.value = row.value;
    this.creationDate = row.creationDate;
    this.items = [];
  }

  static async getAll() {
    const response = await database.query('SELECT * FROM "Order";');
    const orders = response.rows.map(row => new Order(row));
    return orders;
  }

  static async get(orderId) {
    const query = 'SELECT * FROM "Order" WHERE "orderId" = $1';
    const response = await database.query(query, [orderId]);

    if (response.rowCount == 0) return null;

    const order = new Order(response.rows[0]);
    return order;
  }

  static async create(request) {
    const insertQuery = `
      INSERT INTO "Order" ("orderId", "value", "creationDate")
      VALUES ($1, $2, $3)
      RETURNING "orderId", "value", "creationDate";
    `;
    const values = [
      request.orderId,
      request.value,
      request.creationDate
    ];

    const response = await database.query(insertQuery, values);

    const order = new Order(response.rows[0]);
    return order;
  }

  async connectItems() {
    const items = await Item.getAllByOrderId(this.orderId);
    this.items = items;
  }
}

export default Order;