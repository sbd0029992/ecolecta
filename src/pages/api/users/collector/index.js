import bcrypt from 'bcryptjs';
import Truck from 'models/Truck';
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const allUsers = await User.find({});
        const collectorUsers = allUsers.filter(
          (user) => user.type === 'collector'
        );

        const collectors = await User.populate(collectorUsers, {
          path: 'truck',
          model: Truck,
        });

        console.log('collectors:', collectors);
        return res.status(200).json(collectors);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        body.password = hashedPassword;
        const newTask = new User(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error) {
        console.log('error', error.message);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}

export default authMiddleware(handler);
