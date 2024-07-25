export const transformPost = (dbPost) => ({
	id: dbPost.id,
	title: dbPost.title,
	imagUrl: dbPost.imag_url,
	content: dbPost.content,
	publishedAt: dbPost.published_at,
});
