const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post(
  '/register',
  [
    check('email', 'Email wrong').isEmail(),
    check('password', 'Password wrong')
      .isLength({min: 6})
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    console.log("body: ",req.body)

    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        message: "Wrong data"
      })
    }

    const {email, password} = req.body

    const candidate = await User.findOne({email: email})
    if(candidate) {
      
      return res.status(400).json({message: 'User already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({email:email, password: hashedPassword})

    await user.save()

    res.status(201).json({message: 'User created'})
  } catch (e) {
    res.status(500).json({message: "Something went wrong!"})
  }
})

router.post(
  '/login',
  [
    check('email', 'Email wrong').normalizeEmail().isEmail(),
    check('password', 'Password wrong')
      .exists()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(400).json({
        errors: errors.array(),
        message: "Wrong data"
      })
    }

    const {email, password} = req.body

    const user = await User.findOne({email: email})

    if(!user) {
      return res.status(400).json({message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({message: "Password wrong"})
    }

    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      {expiresIn: '1h'}
    )

    const verify = jwt.verify(
      token,
      config.get('jwtSecret'),
    )

    res.json({token, userId: user.id, expiresToken: verify.exp})

  } catch (e) {
    res.status(500).json({message: "Something went wrong"})
  }
})


module.exports = router