import { getUsers } from "../../api/users";
import { updateUsersList } from "./updateUsersList";

export function makeFetchUsersList() {
  return async (dispatch: any) => {
    try {
        const usersList = await getUsers(); // call to the API
        dispatch(updateUsersList(usersList)) // update list of users
    } catch(err) {
        console.error(err)
    }
  }
}