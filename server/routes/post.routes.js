const express = require('express');
const postRouter = express.Router();
const Post = require('../models/post');
const cuid = require('cuid');


// Get all Posts
postRouter.get('/posts', (req, res, next) => {
	Post.find().sort('-dateAdded').exec((err, posts) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ posts });
	});
})

// Get one post by cuid
postRouter.get('/posts/:cuid', (req, res, next) => {
	Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ post });
	});
})

// Add a new Post
postRouter.post('/posts', (req, res, next) => {
	if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
		res.status(403).end();
	}

	const newPost = new Post(req.body.post);

	newPost.cuid = cuid();
	newPost.save((err, saved) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ post: saved });
	});
})

// Delete a post by cuid
postRouter.delete('/posts/:cuid', (req, res, next) => {
	Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}

		post.remove(() => {
			res.status(200).end();
		});
	});
})

// Update a post by cuid
postRouter.put('/posts/:cuid', (req, res, next) => {
	Post.update({ cuid: req.params.cuid }, req.body.post).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ post });
	});
})

// ThumbUp a post
postRouter.put('/posts/:cuid', (req, res, next) => {
	Post.update({ cuid: req.params.cuid }, req.body.post).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ post });
	});
})

// ThumbDown a post by cuid
postRouter.put('/posts/:cuid', (req, res, next) => {
	Post.update({ cuid: req.params.cuid }, req.body.post).exec((err, post) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ post });
	});
})

module.exports = postRouter;