import { deleteComment, getPost } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";
import { getPostCommentsWithAutor } from "../utils";

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещён",
			res: null,
		};
	}

	await deleteComment(id);

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
