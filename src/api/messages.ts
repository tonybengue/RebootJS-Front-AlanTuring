import axios from "axios";
import { IConversation, IConversationMessage } from "../Chat/types";

export async function getConversations():Promise<IConversation[]> {
  // axios vers le back pour récuperer les messages
  // const res = await axios.get('http://localhost:3000/api/messages', { withCredentials : true });
  const res = await axios.get(`${process.env.REACT_APP_BACKEND}/api/messages`, { withCredentials: true });
  const messages: IConversationMessage[] = res.data

  // Utilisation de reduce pour créer un objet groupBy qui regroupe les messages par conversationID
  const accumulatorInitial: { [conversationId: string]: IConversationMessage[] } = {};
  
  // Version du for, batches pour lots
  const batches = messages.reduce((accumulator, message) => {
    // Regarder le conversationId, mettre le message au bon endroit dans l'accumulateur
    const convId = message.conversationId;
    if(accumulator[convId] === undefined) {
      accumulator[convId] = [message];
    } else {
      accumulator[convId].push(message);
    }
    return accumulator;
  }, 
    accumulatorInitial // reducer (type of the messages)
  );
  // Prendre chaque tableau crée pour creer un nouvel objet IConversation avec ses attributs
  // Creer les types deuis la liste de message
  
  // Pour toutes les clés dans batches
  const conversations: IConversation[] = [];
  for(const key in batches) {
    const value = batches[key];
    // 123 => key,
    // [message, message2] => value

    const targetsNotDistincts = value.flatMap(message => [message.emitter, ...message.targets]);
    const targets = [...new Set(targetsNotDistincts)]; // Set for unique elements (distincts)
    // messages.map(message => [message.emitter, ...message.targets]);
    // const updatedAt = messages.sort()[0].createdAt;
    // const updatedAt = messages.sort();
    
    // const sortedMessages = value.sort((message1, message2) => {
    //   const date1 = message1.createdAt
    //   const date2 = message2.createdAt

    //   // return date1.valueOf() - date2.valueOf();
    //   return date1 <= date2 ? 1 : -1; // tri des messages
    // });
    // const updatedAt = sortedMessages[0].createdAt;
    const updatedAt = messages[0].createdAt;

    conversations.push({
      _id: key, // id of the message
      targets: targets, // targets of the conversations
      updatedAt: updatedAt, // date of update
      unseenMessages: 0, // messages not seen by the user
      messages: value, // messages content
    })
  }

  return conversations;

  // return Promise.resolve([{
  //   _id: '1234',
  //   targets: ['5f8ebaeb2dc49b06b841cacf', '5f859e70f17f8e42c8e0dae2'],
  //   updatedAt: new Date(),
  //   unseenMessages: 0,
  //   messages: [{
  //     _id: '1',
  //     conversationId: '1234',
  //     createdAt: new Date(),
  //     emitter: '5f8ebaeb2dc49b06b841cacf', // moi
  //     targets: ['5f859e70f17f8e42c8e0dae2'], // annie
  //     content: 'Salut ça va ?',
  //   },
  //   {
  //     _id: '2',
  //     conversationId: '1234',
  //     createdAt: new Date(),
  //     emitter: '5f859e70f17f8e42c8e0dae2',
  //     targets: ['5f8ebaeb2dc49b06b841cacf'],
  //     content: 'Oui et toi ?',
  //   }]
  // }])
}

export async function sendMessage(content: string, conversationId: string, targets: string[]): Promise<IConversationMessage> {
  const res = await axios.post(
    // 'http://localhost:3000/api/messages',
    `${process.env.REACT_APP_BACKEND}/api/messages`,
    { content, conversationId, targets },
    { withCredentials: true }
  );
  return res.data;
}