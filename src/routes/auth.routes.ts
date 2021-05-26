import { Router } from 'express';

import { authorizationController } from '@controllers';
const authRouter = Router();

authRouter.post('/register', authorizationController.register);
authRouter.post('/login', authorizationController.login);

// authRouter .post(
//   '/login',
//   [
//     check('email', 'Email wrong').normalizeEmail().isEmail(),
//     check('password', 'Password wrong').exists(),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           errors: errors.array(),
//           message: 'Wrong data',
//         });
//       }

//       const { email, password } = req.body;

//       const user = await User.findOne({ email: email });

//       if (!user) {
//         return res.status(400).json({ message: 'User not found' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(400).json({ message: 'Password wrong' });
//       }

//       const token = jwt.sign(
//        { userId: user.id },
//        config.get('jwtSecret'), {
//         expiresIn: '1h',
//       });

//       const verify = jwt.verify(token, config.get('jwtSecret'));

//       res.json({ token, userId: user.id, expiresToken: verify.exp });
//     } catch (e) {
//       res.status(500).json({ message: 'Something went wrong' });
//     }
//   },
// );

export default authRouter;
