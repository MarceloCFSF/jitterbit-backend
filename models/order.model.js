import database from "../services/database.js";

class Order {
  constructor(row) {
    this.orderId = row.orderId;
    this.value = row.value;
    this.creationDate = row.creationDate;
  }

  static async getAll() {
    const response = await database.query('SELECT * FROM "Order";');
    const orders = response.rows.map(row => new Order(row));
    return orders;
  }

  static async create(request) {
    const insertQuery = `
      INSERT INTO "Order" ("orderId", "value", "creationDate")
      VALUES ($1, $2, $3)
      RETURNING "orderId";
    `;
    const values = [
      request.orderId,
      request.value,
      request.creationDate
    ];

    const response1 = await database.query(insertQuery, values);

    const getLastQuery = 'SELECT * FROM "Order" WHERE "orderId" = $1;';
    const response2 = await database.query(
      getLastQuery,
      [response1.rows[0].orderId]
    );

    const order = new Order(response2.rows[0]);
    return order;
  }
}

export default Order;