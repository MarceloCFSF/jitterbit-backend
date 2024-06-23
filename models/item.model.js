import database from "../services/database.js";

class Item {
  constructor(row) {
    this.orderId = row.orderId;
    this.productId = row.productId;
    this.quantity = row.quantity;
    this.price = row.price;
  }

  static async getAllByOrderId(orderId) {
    const query = 'SELECT * FROM "Items" WHERE "orderId" = $1;';
    const response = await database.query(query, [orderId]);

    const items = response.rows.map(row => new Item(row));
    return items;
  }
  
  static async create(request) {
    const insertQuery = `
      INSERT INTO "Items" ("orderId", "productId", "quantity", "price")
      VALUES ($1, $2, $3, $4)
      RETURNING "orderId", "productId", "quantity", "price";
    `;
    const values = [
      request.orderId,
      request.productId,
      request.quantity,
      request.price
    ];

    const response = await database.query(insertQuery, values);

    const order = new Item(response.rows[0]);
    return order;
  }

  toJSON() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}

export default Item;