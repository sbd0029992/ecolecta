import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';
import Cart from '/src/models/Cart';
import Product from '/src/models/Product';
import User from '/src/models/User';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;
  const { id } = req.query; // el ID del carrito

  switch (method) {
    case 'GET':
      try {
        const cart = await Cart.findById(id).populate(User).populate(Product);
        return res.status(200).json(cart);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'PUT':
      try {
        const updatedCart = await Cart.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
        })
          .populate(User)
          .populate(Product);
        return res.status(200).json(updatedCart);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'DELETE':
      try {
        const deletedCart = await Cart.findByIdAndRemove(id);
        if (!deletedCart) {
          return res.status(404).json({ msg: 'No cart found with this ID' });
        }
        return res.status(200).json({ msg: 'Cart deleted' });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
