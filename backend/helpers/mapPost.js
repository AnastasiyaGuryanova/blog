const mongoose = require('mongoose');
const path = require('path');
const mapComment = require('./mapComment');

const apiUrl = process.env.REACT_APP_API_URL;

module.exports = function (post) {
	return {
		id: post.id,
		title: post.title,
		imageUrl: post.image ? `${apiUrl}/uploads/${path.basename(post.image)}` : null,

		content: post.content,
		comments:
			post.comments &&
			post.comments.map((comment) =>
				mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
			),
		publishedAt: post.createdAt && post.createdAt.toISOString().split('T')[0],
	};
};
