import { IConversation, IUpdateConversationListAction, UPDATE_CONVERSATION_LIST } from "../types";

export function updateConversationList(conversations: IConversation[]): IUpdateConversationListAction {
  return {
    type: UPDATE_CONVERSATION_LIST,
    conversations: conversations
  }
}