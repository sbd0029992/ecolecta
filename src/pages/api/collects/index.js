import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';
import Collect from '/src/models/Collect';
import Truck from '/src/models/Truck';
import User from '/src/models/User';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const userId = req.query.userId;
        const user = await User.findById(userId);
        let collects;

        if (user.type === 'collector') {
          collects = await Collect.find({}).populate({
            path: 'user',
            populate: {
              path: 'truck',
              model: Truck,
            },
          });
        } else {
          collects = await Collect.find({
            user: userId,
            status: { $in: [1, 2] },
          }).populate('user');
        }
        return res.status(200).json(collects);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newCollect = new Collect(body);
        const savedCollect = await newCollect.save();
        await savedCollect.populate('user').execPopulate();

        return res.status(201).json(savedCollect);
      } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
