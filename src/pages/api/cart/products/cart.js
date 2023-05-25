import mongoose from 'mongoose';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';
import Cart from '/src/models/Cart';
import Product from '/src/models/Product';
import User from '/src/models/User';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const carts = await Cart.find({
          status: 2,
        })
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'product', model: Product });
        return res.status(200).json(carts);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newCart = new Cart(body);
        await newCart.save();
        const populatedCart = await Cart.findById(newCart._id)
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'product', model: Product });
        return res.status(201).json(populatedCart);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'PUT': {
      const session = await mongoose.startSession();
      try {
        const cartItemsToUpdate = await Cart.find({
          user: body.userId,
          status: 1,
        }).populate({ path: 'product', model: Product });
        let totalPointsToSubtract = 0;
        for (const item of cartItemsToUpdate) {
          totalPointsToSubtract += item.product.price_points;
        }

        session.startTransaction();

        for (const item of cartItemsToUpdate) {
          item.status = body.newStatus;
          await item.save({ session });
        }

        const user = await User.findById(body.userId);
        if (user.points < totalPointsToSubtract) {
          throw new Error('Not enough points');
        }

        user.points -= totalPointsToSubtract;
        await user.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: 'Cart updated successfully' });
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: error.message });
      }
    }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
