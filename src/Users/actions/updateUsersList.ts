import { IUpdateListUsersAction, IUser, UPDATE_USERS_LIST } from "../types";

export function updateUsersList(usersList: IUser[]): IUpdateListUsersAction {
    return {
        type: UPDATE_USERS_LIST,
        users: usersList
    }
}