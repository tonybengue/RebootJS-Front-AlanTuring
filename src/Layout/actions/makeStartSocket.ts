import io from 'socket.io-client';
import { IAppState } from '../../appReducer';
import { updateConversation } from '../../Chat/actions/updateConversation';
import { IConversationMessage } from '../../Chat/types';
import { makeUpdateUser } from '../../Users/actions/makeUpdateUser';
import { IUser } from '../../Users/types';

export function makeStartSocket(){
  return (dispatch: any, getState: () => IAppState) => {
    // const socketServer = io.connect('http://localhost:3000');
    const socketServer = io.connect(`${process.env.REACT_APP_BACKEND}`);

    socketServer.on('connect', () => {
      console.log('Socket connected to back');
    })

    // socketServer.on('mon-super-event', (data: any) => {
    //   console.log(data);
    socketServer.on('new-message', ({message}: {message: IConversationMessage}) => {
      const conversations = getState().conversations.list;
      const conversation = conversations.find(conv => conv._id === message.conversationId);
      // TODO Quid quand la conv n'existe pas
      if(!conversation) { return }

      const newConversation = {
        ...conversation,
        messages: [...conversation.messages, message]
      }
      dispatch(updateConversation(newConversation));
    })

    socketServer.on('user-status-update', ({user}: {user: IUser}) => {
      dispatch(makeUpdateUser(user));
    })
  }
} 