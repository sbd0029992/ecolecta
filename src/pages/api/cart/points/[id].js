import mongoose from 'mongoose';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';
import Point from '/src/models/Point';
import Shop from '/src/models/Shop';
import User from '/src/models/User';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;
  const { id } = req.query; // el ID del carrito

  switch (method) {
    case 'GET':
      try {
        const cart = await Shop.findById(id)
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'point', model: Point });
        return res.status(200).json(cart);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'PUT': {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const updatedCart = await Shop.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true,
          session,
        })
          .populate({
            path: 'user',
            model: User,
          })
          .populate({ path: 'point', model: Point });
        if (updatedCart.status === 2) {
          await User.findByIdAndUpdate(
            updatedCart.user._id,
            { $inc: { points: updatedCart.point.price } },
            { new: true, session }
          );
        }

        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(updatedCart);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: error.message });
      }
    }

    case 'DELETE':
      try {
        const deletedCart = await Shop.findByIdAndRemove(id);
        if (!deletedCart) {
          return res.status(404).json({ msg: 'No cart found with this ID' });
        }
        return res.status(200).json({ msg: 'Shop deleted' });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
