const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { body, validationResult } = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const request = require('request')
const config = require('config')


// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id })
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({msg: 'There is no profile for this user'})
    }

    return res.json(profile)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server error')
  }
})

// @route GET api/profile
// @desc Get or update user profile
// @access Private

router.post('/',
  auth,
  [
    body('status', 'Status is required').not().isEmpty(),
    body('skills', 'Skills is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    const profileFields = {
      user: req.user.id,
      // website:
      //   website && website !== ''
      //     ? normalize(website, { forceHttps: true })
      //     : '',
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    // for (const [key, value] of Object.entries(socialFields)) {
    //   if (value && value.length > 0)
    //     socialFields[key] = normalize(value, { forceHttps: true });
    // }
    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }

  }
)

// @route GET api/profile
// @desc GET all profiles
// @access public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    return res.json(profiles)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server Error')
  }
})

// @route GET api/profile/user/:user_id
// @desc GET profile by user ID
// @access public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile
      .findOne({user: req.params.user_id})
      .populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({msg: 'There is no profile for this user'})
    }

    return res.json(profile)
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') {
      return res.status(400).json({msg: 'There is no profile for this user'})
    }
    return res.status(500).send('Server Error')
  }
})

// @route DELETE api/profile
// @desc Delete profile, user & posts
// @access private
router.delete('/',
  auth,
  async (req, res) => {
  // TODO remove users posts
    try {
      await Profile.findOneAndRemove({user: req.user.id})
      await User.findOneAndRemove({_id: req.user.id})
      return res.json({msg: 'User deleted'})
    } catch (err) {
      console.error(err)
      return res.status(500).send('Server Error')
    }
  }
)

// @route PUT api/profile/experience
// @desc Add profile experience
// @access private
router.put(
  '/experience',
  auth,
  [
    body('title', 'title is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({user: req.user.id})

      if (!profile) {
        res.status(404).json({errors: [{msg: 'No profile has been created'}]})
      }

      profile.experience.unshift(newExp)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience
// @access private
router.delete('/experience/:exp_id', auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id})
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

// @route PUT api/profile/education
// @desc Add profile education
// @access private
router.put(
  '/education',
  auth,
  [
    body('school', 'School is required').not().isEmpty(),
    body('degree', 'Degree is required').not().isEmpty(),
    body('fieldofstudy', 'Field of study is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEd = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({user: req.user.id})

      if (!profile) {
        res.status(404).json({errors: [{msg: 'No profile has been created'}]})
      }

      profile.education.unshift(newEd)

      await profile.save()

      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route DELETE api/profile/experience/:exp_id
// @desc Delete profile experience
// @access private
router.delete('/education/:edu_id', auth, async (req,res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id})
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)
    profile.education.splice(removeIndex, 1)
    await profile.save()
    return res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({errors: [{msg: 'Server Error'}]})
  }
})

// @route GET api/profile/github/:username
// @desc Get user repos from Github
// @access public
router.get('/github/:username', async (req,res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5
      &sort=created:asc&client_id=${config.get('githubClientId')}
      &client_secret=${config.get('githubSecret')}`,
      methods: 'GET',
      headers: { 'user-agent': 'node.js' }
    }
    request(options, (error, response, body) => {
      if (error) console.error(error)
      if (response.statusCode !== 200) {
        return res.status(404).json({msg: 'No github profile found'})
      }
      return res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({errors: [{msg: 'Server Error'}]})
  }
})

module.exports = router