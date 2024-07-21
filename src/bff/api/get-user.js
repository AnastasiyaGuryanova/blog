import { transforUser } from "../transformers";

export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3008/users?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transforUser(loadedUser));
