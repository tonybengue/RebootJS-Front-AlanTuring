import { patchConversationSeen } from "../../api/users";
import { updateConnectedUser } from "../../Users/actions/updateConnectedUser";

export function makeUpdateConversationSeen(conversationId: string){
  return async (dispatch: any) => {
    try {
      const user = await patchConversationSeen(conversationId);
      dispatch(updateConnectedUser(user));
    } catch(err){
      console.error(err);
    }
  }
}