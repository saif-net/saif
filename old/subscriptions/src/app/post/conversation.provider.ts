import { Injectable } from '@graphql-modules/di';
import { PubSub } from 'graphql-subscriptions';

export interface Conversation {
  id: string
  users: [User]
  name: String!
  messages: [Message]
}

@Injectable()
export class ConversationProvider {
  conversations: Conversation[] = [];
  constructor() {}
  getConversations() {
    return this.conversations;
  }
  addConversation(c: Conversation) {
    
  }
}
