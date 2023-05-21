import bcrypt from 'bcryptjs';
import User from 'models/User';
import { dbConnect } from 'utils/mongosee';

dbConnect();

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case 'PUT': {
      const { id, currentPassword, newPassword } = body;

      if (!id || !currentPassword || !newPassword) {
        return res.status(400).json({ error: 'All fields must be provided' });
      }

      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(
          currentPassword,
          user.password
        );

        if (!isPasswordMatch) {
          return res
            .status(400)
            .json({ error: 'Current password is incorrect' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await User.findOneAndUpdate(
          { _id: id },
          { password: hashedPassword },
          { new: true, useFindAndModify: false }
        );

        return res
          .status(200)
          .json({ message: 'Password updated successfully' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
    default:
      return res.status(400).json({ error: 'This method is not supported' });
  }
}

export default handler;
