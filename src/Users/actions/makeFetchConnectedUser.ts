import { getConnectedUser } from "../../api/users";
import { updateConnectedUser } from "./updateConnectedUser";

// Can dispatch others actions
export function makeFetchConnectedUser() {
  return async (dispatch: any) => {
    try {
        const connectedUser = await getConnectedUser();
        dispatch(updateConnectedUser(connectedUser)) // update user store
    } catch(err) {
        console.error(err)
    }
  }
}