import { transformPost } from "../transformers";

export const getPost = async (postId) => {
	try {
		const res = await fetch(`http://localhost:3008/posts/${postId}`);
		if (!res.ok) {
			const error =
				res.status === 404
					? "Такая страница не существует"
					: "Что-то пошло не так. Попробуйте еще раз позднее";
			throw new Error(error);
		}
		const loadedPost = await res.json();
		return transformPost(loadedPost);
	} catch (error) {
		throw error;
	}
};
