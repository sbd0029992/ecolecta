import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';

dbConnect();

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const allUsers = await User.find({});
        const userPhoto = allUsers.filter((user) => user.status === 'send');

        return res.status(200).json(userPhoto);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
