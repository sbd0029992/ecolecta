import Product from 'models/Product';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({});
        return res.status(200).json(products);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();
        await savedProduct.save();

        return res.status(201).json(savedProduct);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
