const express = require('express');
const {
	getPosts,
	getPost,
	addPost,
	editPost,
	deletePost,
} = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comments');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const { parseForm, moveFile, deleteImage } = require('../controllers/file');
const ROLES = require('../constants/roles');
const path = require('path');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	const { posts, lastPage } = await getPosts(
		req.query.search,
		req.query.limit,
		req.query.page
	);

	res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get('/:id', async (req, res) => {
	const post = await getPost(req.params.id);

	res.send({ data: mapPost(post) });
});

router.post('/:id/comments', authenticated, async (req, res) => {
	const newComment = await addComment(req.params.id, {
		content: req.body.content,
		author: req.user.id,
	});

	res.send({ data: mapComment(newComment) });
});

router.delete(
	'/:postId/comments/:commentId',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await deleteComment(req.params.postId, req.params.commentId);

		res.send({ error: null });
	}
);

router.post('/', async (req, res) => {
	const { fields, files } = await parseForm(req);

	const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
	const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

	const imageFile = files.imageFile ? files.imageFile[0] : null;

	const newPath = await moveFile(imageFile, path.join(__dirname, '..', 'uploads'));

	const newPost = await addPost({
		title,
		image: newPath,
		content,
	});

	res.send({ data: mapPost(newPost) });
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const { fields, files } = await parseForm(req);
	const post = await getPost(req.params.id);

	const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
	const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

	let newPath = post.image;
	const imageFile = files.imageFile ? files.imageFile[0] : null;

	if (imageFile) {
		newPath = await moveFile(imageFile, path.join(__dirname, '..', 'uploads'));
		deleteImage(post.image);
	}

	const updatedPost = await editPost(req.params.id, {
		title,
		content,
		image: newPath,
	});

	res.send({ data: mapPost(updatedPost) });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const post = await getPost(req.params.id);

	await deletePost(req.params.id);
	deleteImage(post.image);

	res.send({ error: null });
});

module.exports = router;
