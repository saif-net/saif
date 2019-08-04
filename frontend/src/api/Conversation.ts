import { Message } from "./Message";

interface Conversation {
  name: string;
  id: string;
  messages: Array<Message>;
}
// @ts-ignore
export { Conversation };
