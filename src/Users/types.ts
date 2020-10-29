export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    conversationsSeen: {[convId: string]: Date};
    status: 'online' | 'offline';
}

// Redux - State of users 
export interface IUsersState {
    list: IUser[]
    connectedUser?: IUser // si personne connecté
}

/* Connected User */
// Redux - actions
export const UPDATE_CONNECTED_USER = 'UPDATE_CONNECTED_USER'
export interface IUpdateConnectedUserAction {
    type: typeof UPDATE_CONNECTED_USER,
    user: IUser
}

/* List of users */
export const UPDATE_USERS_LIST = 'UPDATE_LIST_USERS'
export interface IUpdateListUsersAction {
    type: typeof UPDATE_USERS_LIST,
    users: IUser[]
}

// Type of the action
export type IUsersAction = IUpdateConnectedUserAction | IUpdateListUsersAction