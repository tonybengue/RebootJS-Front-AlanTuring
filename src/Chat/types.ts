// A conversation
export interface IConversation {
    _id: string; // id of users
    targets: string[];
    updatedAt: Date;
    unseenMessages: number;
    messages: IConversationMessage[];
}

// A message
export interface IConversationMessage {
    conversationId: string;
    emitter: string;
    content: string;
    createdAt: Date;
    targets: string[];
}

export const UPDATE_CONVERSATION_LIST = 'UPDATE_CONVERSATION_LIST';
export interface IConversationsState {
    list: IConversation[];
    totalUnseenMessages: number;
    // timer?: NodeJS.Timeout;
}

export interface IUpdateConversationListAction {
    type: typeof UPDATE_CONVERSATION_LIST,
    conversations: IConversation[]
}

export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
export interface IUpdateConversationAction {
    type: typeof UPDATE_CONVERSATION,
    conversation: IConversation
}

// export const UPDATE_POLLING_TIMER = 'UPDATE_POLLING_TIMER';
// export interface IUpdatePollingTimerAction {
//     type: typeof UPDATE_POLLING_TIMER,
//     timer: NodeJS.Timeout;
// }

export type IConversationsAction = 
    IUpdateConversationListAction | 
    IUpdateConversationAction; //| IUpdatePollingTimerAction;