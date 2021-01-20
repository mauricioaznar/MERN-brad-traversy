const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const gravatar = require('gravatar')
const bcryptjs = require('bcryptjs')
const User = require('../../models/User')

// @route GET api/users
// @desc Register user
// @access Public
router.post('/',
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a vaild email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters')
    .isLength({min: 5}),
  async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {name, email, password} = req.body
      const user = await User.findOne({email})

      if (user) {
        res.status(400).json({ errors: [{msg: 'User already exists'}]})
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      const salt = await bcryptjs.genSalt(10)

      const newUser = new User({
        name,
        email,
        password,
        avatar
      })

      newUser.password = await bcryptjs.hash(password, salt)

      await newUser.save()

      return res.send('User registered')
    } catch (err){
      console.log(err.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router