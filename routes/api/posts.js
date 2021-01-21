const User = require('../../models/User')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  '/',
  auth,
  [
    body('text', 'text is required').not().isEmpty()
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }
      const user = await User.findById(req.user.id).select('-password')
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      })

      const post = await newPost.save()

      return res.json(post)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const posts = await Post.find().sort({date: -1})
      return res.json(posts)
    } catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
    }
  }
)

// @route GET api/posts/:id
// @desc Get post by ID
// @access Private
router.get(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).sort({date: -1})

      if (!post) {
        return req.status(404).json({errors: [{msg: 'Post not found'}]})
      }

      return res.json(post)
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(500).json({errors: [{msg: 'Post not found'}]})
      }
      return res.status(500).send('Server Error')
    }
  }
)

// @route DELETE api/posts/:id
// @desc Delete all posts
// @access Private
router.delete(
  '/:id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({msg: 'Post not found'})
      }

      // Check user
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'User not authorized'})
      }

      await post.remove()

      return res.json({msg: 'Post removed'})
    } catch (err) {
      console.log(err)
      if (err.kind === 'ObjectId') {
        return res.status(500).json({errors: [{msg: 'Post not found'}]})
      }
      res.status(500).send('Server Error')
    }
  }
)

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
router.put(
  '/like/:id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({msg: 'Post not found'})
      }

      const isLikedByUser = post.likes.filter(like => {
        return like.user.toString() === req.user.id
      }).length > 0

      if (isLikedByUser) {
        return res.status(400).json({msg: 'Post already liked'})
      }

      post.likes.unshift({user: req.user.id})

      await post.save()

      res.json(post.likes)
    } catch (e) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  }
)

// @route PUT api/posts/like/:id
// @desc Like a post
// @access Private
router.put(
  '/unlike/:id',
  auth,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({msg: 'Post not found'})
      }

      const isNotLikedByUser = post.likes.filter(like => {
        return like.user.toString() === req.user.id
      }).length === 0

      if (isNotLikedByUser) {
        return res.status(400).json({msg: 'Post already liked'})
      }

      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

      post.likes.splice(removeIndex, 1)

      await post.save()

      res.json(post.likes)
    } catch (e) {
      console.error(err)
      res.status(500).send('Server Error')
    }
  }
)

// @route POST api/posts/comment/:id
// @desc Comment on a post
// @access Private
router.post(
  '/comment/:id',
  auth,
  [
    body('text', 'text is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({msg: 'Post not found'})
      }

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment)

      await post.save()

      return res.json(post)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route DELETE api/posts/comment/:id/:comment_id
// @desc Delete comment on a post
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  auth,
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }
    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      if (!post) {
        return res.status(404).json({msg: 'Post not found'})
      }

      const comment = post.comments.find(comment => {
        return comment.id === req.params.comment_id
      })

      if (!comment) {
        return res.status(404).json({msg: 'Comment does not exist'})
      }

      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({msg: 'User not authorized'})
      }

      const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

      post.comments.splice(removeIndex, 1)


      await post.save()

      return res.json(post)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

module.exports = router