import { IAppState } from "../../appReducer"
import { makeFetchConversations } from "../../Chat/actions/makeFetchConversations"
import { makeFetchConnectedUser } from "../../Users/actions/makeFetchConnectedUser"
import { makeFetchUsersList } from "../../Users/actions/makeFetchUsersList"
import { makeStartSocket } from "./makeStartSocket"
// import { updatePollingTimer } from "../../Chat/actions/updatePollingTimer"

export function makeInitApp(){
  return async (dispatch: any, getState: () => IAppState) => {
    await dispatch(makeFetchConnectedUser())
    dispatch(makeFetchUsersList())

    dispatch(makeFetchConversations())
    dispatch(makeStartSocket())

    // const timer = setInterval(() => {
    //   if(getState().users.connectedUser) {
    //     // dispatch(makeFetchConversations())
    //   }
    // }, 3000)
    // dispatch(updatePollingTimer(timer));
  }
}