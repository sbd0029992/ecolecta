/* eslint-disable import/no-anonymous-default-export */
import Truck from 'models/Truck';
import { dbConnect } from 'utils/mongosee';

import authMiddleware from '/src/middlewares/authMiddleware';

dbConnect();

async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const truck = await Truck.findById(id);
        if (!truck) {
          return res.status(404).end(`Truck not found`);
        }
        return res.status(200).json({ truck });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    case 'PUT':
      try {
        const updateTask = await Truck.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (!updateTask) return res.status(404).end(`Truck not found`);
        return res.status(200).json({ updateTask });
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case 'DELETE':
      try {
        const deleteTask = await Truck.findByIdAndDelete(id);
        if (!deleteTask) return res.status(404).end(`Truck not found`);
        return res.status(204).json({ deleteTask });
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default authMiddleware(handler);
