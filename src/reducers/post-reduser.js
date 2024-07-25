import { ACTION_TYPE } from "../actions/action-type";

const initialPostState = {
	id: "",
	title: "",
	imagUrl: "",
	content: "",
	publishedAt: "",
	comments: [],
};

export const postReduser = (state = initialPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
