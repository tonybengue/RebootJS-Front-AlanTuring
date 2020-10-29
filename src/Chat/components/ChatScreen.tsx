import React, { Component, Fragment } from 'react';
import { IConversation } from '../types';

import { AttendeesList } from './AttendeesList';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

import { Loading } from '../../Layout/components/Loading';
import { IAppState } from '../../appReducer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// interface IChatScreenState {
//   conversation?: IConversation; // one conv
// }

interface ChatScreenProps {
  match: any;
  history: any;
  location: any;
  conversation?: IConversation;
}

// interface ChatScreenProps extends ChatScreenPropsTmp {
// }

// class ChatScreen extends Component<{}, IChatScreenState> {
  // constructor(props: {}) {
  //   super(props);
  //   this.state = {};
  // }

  // componentDidMount(){
  //   // Get the conversations
  //   getConversations()
  //     .then(conversations => {
  //       console.log(conversations)
  
  //       this.setState({
  //         conversation: conversations[0]
  //       })
  //   })
  // }

  // sendNewMessage = (message: string) => {
  //   // this.state.conversation?._id
  //   // this.state.conversation?.targets.filter()
  // }

class ChatScreen extends Component<ChatScreenProps> {
  render(){
    const { conversation } = this.props;
    if(!conversation) return <Loading />

    return (
      <Fragment>
        <h1>Chat</h1>
        <ChatMessages messages={conversation.messages} conversationId={conversation._id} />
        <ChatInput conversation={conversation} />
        <AttendeesList users={conversation.targets}/>
    </Fragment>
    )
  }
}

const mapStateToProps = ({conversations}: IAppState, props: ChatScreenProps) => {
  const conversationID = props.match.params.id; // link to the route

  return {
    conversation: conversations.list.find(conv => conv._id === conversationID)
  }
}
export default connect(mapStateToProps)(withRouter(ChatScreen));

// export default ChatScreen; 