import { dbConnect } from 'utils/mongosee';

import Collect from '/src/models/Collect';
import User from '/src/models/User';

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      try {
        const userId = req.query.userId; // Obtén el userId desde la consulta
        const user = await User.findById(userId); // Encuentra al usuario con el ID proporcionado

        let collects;

        // Si el usuario es un recolector, devuelve todas las recolecciones
        if (user.type === 'collector') {
          collects = await Collect.find({});
        } else {
          // Si el usuario no es un recolector, filtra las recolecciones según el ID del usuario y el estado
          collects = await Collect.find({
            user: userId,
            status: { $in: [1, 2] },
          });
        }
        console.log('🚀 ~ file: index.js:22 ~ handler ~ collects:', collects);

        return res.status(200).json(collects);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    case 'POST':
      try {
        const newCollect = new Collect(body);
        const savedCollect = await newCollect.save();
        await savedCollect.save();

        return res.status(201).json(savedCollect);
      } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: 'This method is not supported' });
  }
}
