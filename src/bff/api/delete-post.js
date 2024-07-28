export const deletePost = (postId) =>
	fetch(`http://localhost:3008/posts/${postId}`, {
		method: "DELETE",
	});
