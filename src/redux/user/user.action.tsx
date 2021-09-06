import { User } from "../../models";
import { userActionTypes } from "./user.types";

export const setUsers = (users: User[]) => {
	return {
		type: userActionTypes.SET_USERS,
		payload: users
	};
};
