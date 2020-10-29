import { getConversations } from "../../api/messages"
import { updateConversationList } from "./updateConversationList";
import { IAppState } from "../../appReducer";

export function makeFetchConversations() {
    return async (dispatch: any, getState: () => IAppState) => {
        try {
          const connectedUser = getState().users.connectedUser;
          if(!connectedUser) { return }
          
          const conversations = await getConversations();

          /*
            conversationns = [ {_id: '1234567', unseenMessages: 0, messages: [mess1]}, conv2 ]
            const connectedUser = { conversationsSeen: { '123456': 'DATE' } }
            const conversation = {_id: '123456', unseenMessages: 0, messages: [mess1]}
          */
          conversations.map(conversation => {
            const lastSeenDate = connectedUser.conversationsSeen[conversation._id]
            let unseenMessages;
            if(!lastSeenDate) {
              unseenMessages = conversation.messages.length;
            } else {
              unseenMessages = conversation.messages
                          .filter(message => new Date(message.createdAt) > new Date(lastSeenDate))
                          .length
            }
            conversation.unseenMessages = unseenMessages;
            return conversation
          })
          /*
            conversationns = [
              {_id: '1234567', unseenMessages: 2, messages: [mess1]},
              {_id: '123456', unseenMessages: 4, messages: [mess2]}
            ]
            reduce((acc, conv) => acc + conv.unseenMessages, 0)
            const connectedUser = { conversationsSeen: { '123456': 'DATE' } }
            const conversation = {_id: '123456', unseenMessages: 0, messages: [mess1]}
          */
            dispatch(updateConversationList(conversations));
        } catch(err) {
            console.error(err);
        }
    }
}