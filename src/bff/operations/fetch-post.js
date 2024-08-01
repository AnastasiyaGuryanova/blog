import { getPost } from "../api";
import { getPostCommentsWithAutor } from "../utils";

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

	const commentsWithAutor = await getPostCommentsWithAutor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAutor,
		},
	};
};
