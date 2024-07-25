export const deleteComment = async (commentId) =>
	fetch(`http://localhost:3008/comments/${commentId}`, {
		method: "DELETE",
	});
