import { transformPost } from "../transformers";

export const getPosts = async (page, limit) => {
	const response = await fetch(
		`http://localhost:3008/posts?_page=${page}&_per_page=${limit}`,
	);
	//const data = await response.json();
	//return data;
	const { data: loadedPosts, last: totalCountPage } = await response.json();

	return {
		posts: loadedPosts?.map(transformPost),
		totalCountPage,
	};
};
