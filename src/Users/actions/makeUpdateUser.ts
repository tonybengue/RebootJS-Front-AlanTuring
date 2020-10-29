import { IAppState } from "../../appReducer";
import { IUser } from "../types";
import { updateUsersList } from "./updateUsersList";

export function makeUpdateUser(userToUpdate: IUser){
  return (dispatch: any, getState: () => IAppState) => {
    const users = getState().users.list;

    const updatedList = [
      ...users.filter(user => user._id !== userToUpdate._id),
      userToUpdate
    ]

    dispatch(updateUsersList(updatedList));
  }
} 