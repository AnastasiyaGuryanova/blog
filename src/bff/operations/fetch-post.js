import { getPost, getComments, getUsers } from "../api";

export const fetchPost = async (postId) => {
	let post;
	let error;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError.message;
	}

	if (error) {
		return {
			error,
			res: null,
		};
	}

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithAutor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAutor,
		},
	};
};
