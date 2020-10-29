import axios from "axios";
import { IUser } from '../Users/types';

// Get all the users
export function getUsers(): Promise<IUser[]> {
  // return axios.get('http://localhost:3000/api/users/').then(res => res.data);
  return axios.get(`${process.env.REACT_APP_BACKEND}/api/users/`).then(res => res.data);
}
  
// Get the connected user
export function getConnectedUser(): Promise<IUser>{
  return axios.get(
    // 'http://localhost:3000/api/users/me',
    `${process.env.REACT_APP_BACKEND}/api/users/me`,
    { withCredentials: true }
  ).then(res => res.data);
}

// Log the user
export function login(email: string, password: string): Promise<IUser>{
  return axios.post(
      // 'http://localhost:3000/api/login/', 
      `${process.env.REACT_APP_BACKEND}/api/login/`,
    {
      username: email,
      password: password
    }, {
      withCredentials: true
    }
  ).then(res => res.data)
}

// Register a user
export function register(email: string, firstName: string, lastName: string, password: string): Promise<IUser>{
  return axios.post(
    // 'http://localhost:3000/api/users/',
    `${process.env.REACT_APP_BACKEND}/api/users/`,
    { email, firstName, lastName, password }, {
      withCredentials: true
    }
  ).then(res => res.data)
}

// Conversation seen updated
export function patchConversationSeen(conversationId: string){
  return axios.patch(
    // 'http://localhost:3000/api/users/conversation-seen',
    `${process.env.REACT_APP_BACKEND}/api/users/conversation-seen`,
    { conversationId },
    { withCredentials: true }
  ).then(res => res.data);
}

// Maj interface avec proprs
// getUsers()
// //   .then(users => <UserList users={users} />)
//   .then(users => users.map())
//   .catch(err => <Error message='Il y a une erreur'>)