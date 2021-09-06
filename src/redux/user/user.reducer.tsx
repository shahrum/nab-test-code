import { User } from "../../models";
import { userActionTypes } from "./user.types";

const INITIAL_STATE: { users: User[] | null } = {
	users: null
};

const usersReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case userActionTypes.SET_USERS:
			return {
				...state,
				users: action.payload
			};
		default:
			return state;
	}
};

export default usersReducer;
