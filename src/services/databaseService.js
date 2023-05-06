import User from '/src/models/User';
import { dbConnect } from '/src/utils/mongosee';

dbConnect();

export function databaseServiceFactory() {
  const getUser = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  };
  console.log('getUser', getUser);
  return { getUser };
}
