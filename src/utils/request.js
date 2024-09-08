export const request = async (path, method, data) => {
	const headers = {};

	if (!(data instanceof FormData)) {
		headers["content-type"] = "application/json";
	}

	return fetch("/api" + path, {
		headers,
		method: method || "GET",
		body:
			data instanceof FormData
				? data
				: data
					? JSON.stringify(data)
					: undefined,
	}).then((res) => res.json());
};
