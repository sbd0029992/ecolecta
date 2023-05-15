import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';
import Point from '/src/models/Point';
import Shop from '/src/models/Shop';
import User from '/src/models/User';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const carts = await Shop.find({
          status: 1,
        })
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'point', model: Point });

        const cartsWithImages = carts.filter(
          (cart) => cart.images && cart.images.length > 0
        );

        return res.status(200).json(cartsWithImages);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'POST':
      try {
        const newCart = new Shop(body);
        await newCart.save();
        const populatedCart = await Shop.findById(newCart._id)
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'point', model: Point });
        return res.status(201).json(populatedCart);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
