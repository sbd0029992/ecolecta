import Truck from 'models/Truck';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const tasks = await Truck.find({});
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newTask = new Truck(body);
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
