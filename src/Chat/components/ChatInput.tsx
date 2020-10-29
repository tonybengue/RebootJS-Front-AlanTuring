import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { sendMessage } from '../../api/messages';
import { updateConversation } from '../actions/updateConversation';
import { connect } from 'react-redux';
import { IConversation } from '../types';

interface ChatInputProps {
  // conversationId: string;
  // targets: string[];
  conversation: IConversation;
  updateConversation: (conversation: IConversation) => void;
}

interface ChatInputState {
  messageInput: string
}

// class ChatInput extends Component<{}, ChatInputState> {
class ChatInput extends React.Component<ChatInputProps, ChatInputState> {
  constructor(props: ChatInputProps){
    super(props);
    this.state = { messageInput: '' }
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sentMessage = await sendMessage(
      this.state.messageInput,
      this.props.conversation._id,
      this.props.conversation.targets
    )
    this.setState({
      messageInput: ''
    })
    // Update conversation ?
    // const newConversation = this.props.conversation <- Ceci ne copie pas l'objet !!
    // newConversation.messages.push(sentMessage) <- Push ne crée pas de nouveau tableau !!
    const newConversation = {
      ...this.props.conversation,
      messages: [...this.props.conversation.messages, sentMessage]
    };
    this.props.updateConversation(newConversation);
  }
  
  handleChange = (newMessage: string) => {
    this.setState({
      messageInput: newMessage
    })
  }
  
  render(){
    return (
      // <form onSubmit={this.props.sendMessage(this.state.newMessageInput)}>
      <form onSubmit={(e) => this.handleSubmit(e) }>
        <Grid container spacing={1} alignItems="center" justify="space-between">
          <Grid item xs={9}>
            <TextField
              fullWidth={true}
              variant="outlined"
              placeholder="Type your message here"
              onChange={(e) => this.handleChange(e.target.value)}
              value={this.state.messageInput}
            />
          </Grid>
          <Grid item xs={2}>
            <Button 
              type="submit"
              variant="contained"
              color="primary"
            >
              Envoyer
            </Button>
          </Grid>
        </Grid>
      </form>
    )
  }
}

// export default ChatInput; 
const mapDispatchToProps = (dispatch: any) => ({
  updateConversation: (conversation: IConversation) => { dispatch(updateConversation(conversation))}
})
export default connect(undefined, mapDispatchToProps)(ChatInput); 