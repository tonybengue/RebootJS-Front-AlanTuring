import React, { useEffect } from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { makeUpdateConversationSeen } from '../actions/makeUpdateConversationSeen';
import { IConversationMessage } from '../types';
import { ChatMessage } from './ChatMessage';

/*
componentDidMount(){ //chargement initial
  ACTION A REALISEE
}

componentDidUpdate(prevProps){
  if(this.props.messages !== prevProps.messages){
    ACTION A REALISEE
  }
}
*/

interface ChatMessagesProps {
  messages : IConversationMessage[];
  conversationId: string;
  makeUpdateConversationSeen: (convId: string) => void;
}

function ChatMessages({messages, conversationId, makeUpdateConversationSeen}: ChatMessagesProps){
  useEffect(
    () => {
      makeUpdateConversationSeen(conversationId)
    },
    [messages]
    [messages.length]
  )

  return (
    <ul>
      {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
    </ul>
  )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Action>) => ({
  makeUpdateConversationSeen: (conversationId: string) => dispatch(makeUpdateConversationSeen(conversationId))
});

export default connect(undefined, mapDispatchToProps)(ChatMessages);