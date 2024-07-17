export const getUsers = () =>
	fetch("http://localhost:3008/users").then((loadedUsers) =>
		loadedUsers.json(),
	);
