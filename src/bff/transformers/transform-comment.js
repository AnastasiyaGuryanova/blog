export const transformComment = (dbComment) => ({
	id: dbComment.id,
	author: dbComment.author,
	postId: dbComment.post_id,
	authorId: dbComment.author_id,
	content: dbComment.content,
	publishedAt: dbComment.published_at,
});
