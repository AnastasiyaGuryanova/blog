import { ACTION_TYPE } from "../actions/action-type";
import { ROLE } from "../constants";

const initialUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReduser = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}

		case ACTION_TYPE.LOGAUT: {
			return initialUserState;
		}

		default:
			return state;
	}
};
