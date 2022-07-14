import { Request, Response } from 'express';
import OrdersService from '../services/ordersService';

class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    res.status(200).json(orders);
  };
}

export default OrdersController;