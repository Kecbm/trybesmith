import connection from '../models/connection';
import OrdersModel from '../models/ordersModel';
import Orders from '../interfaces/orderInterface';
import ProductsModel from '../models/productsModel';

class OrdersService {
  public model: OrdersModel;

  public productsModel: ProductsModel;

  constructor() {
    this.model = new OrdersModel(connection);
    this.productsModel = new ProductsModel(connection);
  }

  public async getAll(): Promise<Orders[]> {
    const orders = await this.model.getAll();
    const products = await this.productsModel.getAll();

    const result = orders.map(({ id, userId }) => ({
      id,
      userId,
      productsIds: products.filter((product) => id === product.orderId).map((elem) => elem.id),
    }));

    return result as Orders[];
  }
}

export default OrdersService;