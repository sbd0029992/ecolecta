/* eslint-disable import/no-anonymous-default-export */
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).end(`User not found`);
        }
        return res.status(200).json({ user });
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    case 'PUT':
      try {
        const updateTask = await User.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updateTask) return res.status(404).end(`User not found`);
        return res.status(200).json({ updateTask });
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case 'DELETE':
      try {
        const deleteTask = await User.findByIdAndDelete(id);
        if (!deleteTask) return res.status(404).end(`User not found`);
        return res.status(204).json({ deleteTask });
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};
