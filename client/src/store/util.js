import getStoredState from "redux-persist/es/getStoredState";
import { CONFIG } from "./persistConfig";


export async function getRehydratedState() {
	const state = await getStoredState(CONFIG);
	return state
}

