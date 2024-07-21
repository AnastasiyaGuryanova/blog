export const deleteUser = (userId) =>
	fetch(`http://localhost:3008/users/${userId}`, {
		method: "DELETE",
	});
