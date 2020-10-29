import React from 'react';
import { List } from '@material-ui/core';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { IConversation } from '../types';
import { ConversationsListItem } from './ConversationsListItem';

interface ConversationsListProps {
  conversations: IConversation[];
}

// interface IConversationsListState {
//   conversations: IConversation[];
// }

// Display a conversation in the AppDrawer
// class ConversationsList extends React.Component<{}, IConversationsListState>{
  // constructor(props: {}){
  //   super(props);
  //   this.state = {
  //     conversations: []
  //   }
  // }

  // componentDidMount(){
  //   getConversations().then(conversations =>{
  //     this.setState({
  //       conversations
  //     })
  //   })
  // }

class ConversationsList extends React.Component<ConversationsListProps> {
  render() {
    if(this.props.conversations.length === 0){
      return <h1>Loading</h1>
    } else {
      return <List>
        {/* {this.props.conversations.map((conversation, index) => 
          <ConversationsListItem 
            key={index} 
            conversation={conversation}
          />)
        } */}
            {this.props.conversations.map((conversation, index) => <ConversationsListItem key={index} conversation={conversation} />)}
      </List>
    }
  }
}

const mapStateToProps = ({conversations}: IAppState) => ({
  conversations: conversations.list
})

export default connect(mapStateToProps)(ConversationsList);
// export default ConversationsList;