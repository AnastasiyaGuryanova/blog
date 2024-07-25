import { transformRole } from "../transformers";

export const getRoles = () =>
	fetch("http://localhost:3008/roles")
		.then((loadedRoles) => loadedRoles.json())
		.then((loadedRoles) => loadedRoles.map(transformRole));
