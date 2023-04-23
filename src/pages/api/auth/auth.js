import withSession from '/src/lib/session';
import { authServiceFactory } from '/src/services/authService';
import { databaseServiceFactory } from '/src/services/databaseService';

const dbService = databaseServiceFactory();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
  const ERROR_CREDENTIALS = 'Invalid email or password  ';

  const method = req.method.toLowerCase();
  const { email, password } = req.body;
  if (method !== 'post') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await dbService.getUser(email);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const status = user.status;
    const type = user.type;
    const idUser = user._id;
    const passwordMatches = await authService.validate(password, user.password);
    if (passwordMatches) {
      await saveSession(
        { firstName, lastName, status, type, idUser, email },
        req
      );
      res
        .status(200)
        .json({ firstName, lastName, status, type, idUser, email });
      return;
    }
  } catch (error) {
    console.log('validate: ', error.message);
  }
  res.status(403).json({ error: ERROR_CREDENTIALS });
});

async function saveSession(user, request) {
  request.session.set('user', user);
  await request.session.save();
}
