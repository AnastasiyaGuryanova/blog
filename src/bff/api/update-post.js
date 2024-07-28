export const updatePost = ({ id, image, title, content }) =>
	fetch(`http://localhost:3008/posts/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			image_url: image,
			title,
			content,
		}),
	}).then((loadedPost) => loadedPost.json());
