import withSession from '/src/lib/session';
import authMiddleware from '/src/middlewares/authMiddleware';

export default authMiddleware(
  withSession(async (req, res) => {
    const user = req.session.get('user');

    if (user) {
      res.json({
        isLoggedIn: true,
        ...user,
      });
    } else {
      res.json({
        isLoggedIn: false,
      });
    }
  })
);
