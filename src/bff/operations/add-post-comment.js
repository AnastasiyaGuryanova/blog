import { addComment, getPost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";
import { getPostCommentsWithAutor } from "../utils";

export const addPostComment = async (hash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	await addComment(userId, postId, content);

	const post = await getPost(postId);

	const commentsWithAutor = await getPostCommentsWithAutor(postId);

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAutor,
		},
	};
};
