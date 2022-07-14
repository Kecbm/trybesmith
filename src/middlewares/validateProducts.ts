import { NextFunction, Request, Response } from 'express';
import Product from '../interfaces/productInterface';

const properties = ['name', 'amount'];

function validateProperties(product: Product): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateString(product: Product): [boolean, boolean, string | null] {
  if (typeof product.name !== 'string') {
    return [false, true, 'name'];
  }

  if (typeof product.amount !== 'string') {
    return [false, true, 'amount'];
  }

  if (product.name.length < 2) {
    return [true, false, 'name'];
  }

  if (product.amount.length < 2) {
    return [true, false, 'amount'];
  }

  return [true, true, null];
}

function validationProduct(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  const [valid, property] = validateProperties(product);

  if (!valid) {
    return res.status(400).json({ message: `"${property}" is required` });
  }

  const [validString, stringLength, nameProperty] = validateString(product);

  if (!validString) {
    return res.status(422).json({ message: `"${nameProperty}" must be a string` });
  }

  if (!stringLength) {
    return res.status(422)
      .json({ message: `"${nameProperty}" length must be at least 3 characters long` });
  }

  next();
}

export default validationProduct;