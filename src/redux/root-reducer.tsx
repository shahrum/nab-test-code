import { combineReducers } from "redux";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import usersReducer from "./user/user.reducer";
const persistConfig = {
	key: "root",
	storage: storageSession,
	whitelist: ["users"]
};

const rootReducer = combineReducers({
	users: usersReducer
});
export default persistReducer(persistConfig, rootReducer);
