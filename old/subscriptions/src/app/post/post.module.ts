import { GraphQLModule } from '@graphql-modules/core';
import { PubSub } from 'graphql-subscriptions';
import { CommonModule } from '../common/common.module';
import { PostsProvider } from './post.provider';

export const ChatModule = new GraphQLModule({
  imports: [CommonModule],
  providers: [PostsProvider],
  typeDefs: `
      type Subscription {
        messageAdded: Message
      }

      type Query {
        conversations: [Conversation]
        messages(conversation: ID) [Message]
      }

      type Conversation {
        id: ID
        users: [User]
        name: String!
        messages: [Message]
      }
      type ConversationInput {
        users: [User]
        name: String!
        messages: [Message]
      }

      type Message {
        id: ID
        message: String
        timestamp: DateTime
      }
      type MessageInput {
        message: String
      }

      type User {
        id: ID
        name: String
      }

      type Mutation {
        addMutation(conversation: ID, message: MessageInput): Message
        addConversation(conversation: ConversationInput): Conversation
      }
  `,
  resolvers: {
    Subscription: {
      messageAdded: {
        // Additional event labels can be passed to asyncIterator creation
        subscribe: (root, args, { injector }) => injector.get(PubSub).asyncIterator(['MESSAGE_ADDED'])
      }
    },
    Query: {
      conversations: (root, args, { injector }) => injector.get(PostsProvider).getPosts()
    },
    Mutation: {
      addPost: (root, args, { injector }) => {
        return injector.get(PostsProvider).addPost(args);
      }
    }
  }
});
