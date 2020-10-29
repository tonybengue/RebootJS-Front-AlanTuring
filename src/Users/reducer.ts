import { 
  UPDATE_CONNECTED_USER,
  UPDATE_USERS_LIST,
  IUsersAction,
  IUsersState
} from "./types";

export function users(state: IUsersState = defaultUsersState(), action: IUsersAction): IUsersState {
  switch(action.type) {
      case UPDATE_CONNECTED_USER:
          return {
              ...state,
              connectedUser: action.user
          }
      case UPDATE_USERS_LIST:
          return {
              ...state,
              list: action.users
          }
      default:
        return state
  }
}

function defaultUsersState() {
  return {
    list: [],
  }
}