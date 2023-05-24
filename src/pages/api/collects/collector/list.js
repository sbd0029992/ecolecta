import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';
import Collect from '/src/models/Collect';
import User from '/src/models/User';

dbConnect();

async function handler(req, res) {
  const {
    method,
    query: { userId },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const collects = await Collect.find({
          collector: userId,
          status: 2,
        }).populate({ path: 'user', model: User });

        return res.status(200).json(collects);
      } catch (error) {
        console.error('Error fetching collects:', error);
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
