import { IUser } from "../../Users/types";

const users : IUser[] = [
  {_id: '', firstName: "John", lastName: "Doe", email: "email", conversationsSeen: {}, status: 'offline'},
  {_id: '', firstName: "Jane", lastName: "Doe", email: "anotherEmail", conversationsSeen: {}, status: 'offline'}
];
export const getUsers = jest.fn().mockReturnValue(Promise.resolve(users));