import React, { useState, Children } from "react";

import { RouteComponentProps } from "react-router";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";
import { ChatFeed, Message } from "react-chat-ui";
import { Query, Subscription, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Message as MessageType } from "../api/Message";
import { User } from "../api/User";
import Submit from "../components/Submit";

interface ConversationDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GET_MESSAGES = gql`
  query getMessages($id: ID) {
    allMessages(filter: { conversation: { id: $id } }) {
      id
      message
      timestamp
      user {
        id
      }
    }
  }
`;
const SUBSCRIBE_MESSAGES = gql`
  subscription getMessages($id: ID) {
    Message(filter: { node: { conversation: { id: $id } } }) {
      node {
        id
        message
        timestamp
        user {
          id
        }
      }
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation AddMessage($message: String, $conversation: ID, $user: ID) {
    createMessage(
      message: $message
      conversationId: $conversation
      userId: $user
    ) {
      id
      message
      timestamp
    }
  }
`;

interface MessagesQuery {
  allMessages?: Array<{
    id: string;
    message: string;
    user: { id: string };
  }>;
  // Message: {
  //   node: {
  //     id: string;
  //     message: MessageType;
  //     userId: string
  //   };
  // };
}

interface MessagesInput {
  id: string;
}

interface NewMessage {
  id: string;
}

interface MessageMutation {
  message: string;
  // userId: string;
  conversation: string;
  user: string;
  // timestamp: string;
}
// class SubscriptionWrapper extends React.Component<{children: React.ReactNode, subscribeToMessages}> {
//   unsubMessages: any
//   // static unsubMessages: any

//   componentDidMount() {
//     this.unsubMessages = this.props.subscribeToMessages(subscribeToMore);
//   }
//   componentWillUnmount() {
//     if (this.unsubMessages) {
//       this.unsubMessages() // this unsubscribes so if this ever unmounts you dont keep the sub around
//     }
//   }
//   render({children}) {
//     return (<>{children}</>)
//   }
// }

type SubscriptionWrapperProps = {
  children: React.ReactElement;
  subscribeToNewComments: () => void;
};

class SubscriptionWrapper extends React.Component<SubscriptionWrapperProps> {
  componentDidMount() {
    this.props.subscribeToNewComments();
  }
  render() {
    return <>{this.props.children}</>;
  }
}

// export default SubscriptionWrapper

const Details: React.FC<ConversationDetailPageProps> = ({ match }) => {
  // const [messages, setMessages] = useState([
  //   new Message({
  //     id: 1,
  //     message: "I'm the recipient! (The person you're talking to)"
  //   }), // Gray bubble
  //   new Message({ id: 0, message: "I'm you -- the blue bubble!" })
  // ]);
  const messages = [
    // new Message({
    //   id: 1,
    //   message: "I'm the recipient! (The person you're talking to)"
    // }), // Gray bubble
    // new Message({ id: 0, message: "I'm you -- the blue bubble!" })
  ];
  // console.log(messages);
  const [currentMessage, setMessage] = useState("");
  const [isTyping, setTypingState] = useState(false);
  console.log(isTyping);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/conversations" />
          </IonButtons>
          <IonTitle>{match.params.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/*  
      // @ts-ignore */}
      <IonContent padding>
        <Query<MessagesQuery, MessagesInput>
          query={GET_MESSAGES}
          variables={{ id: match.params.id }}
        >
          {({ loading, data, error, subscribeToMore }) => {
            if (loading) {
              console.log("Loading");
            }
            if (error) {
              console.log(error);
              return `Error! ${error.message}`;
            }
            if (!data) {
              return `No Messages!`;
            }
            if (!data.allMessages) {
              return `No Messages!`;
            }
            console.log(data);
            const m = data.allMessages.map(
              m =>
                new Message({
                  id: m.user ? m.user.id : 0,
                  message: m.message
                })
            );
            console.log(m);
            // const newItem = new Message({
            //   id: data.Message.node.userId,
            //   message: data.Message.node.message
            // });
            return (
              <SubscriptionWrapper
                subscribeToNewComments={() =>
                  subscribeToMore({
                    document: SUBSCRIBE_MESSAGES,
                    variables: { id: match.params.id },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      console.log("prev", prev);
                      console.log("new", subscriptionData);
                      const rn = Object.assign({}, prev, {
                        allMessages: [
                          // @ts-ignore
                          ...prev.allMessages,
                          // @ts-ignore
                          subscriptionData.data.Message.node
                        ]
                      });

                      console.log("rn", rn);
                      // @ts-ignore
                      subscriptionData.data = null;
                      return rn;
                      // const newFeedItem = subscriptionData.data.commentAdded;

                      // return Object.assign({}, prev, {
                      //   entry: {
                      //     comments: [newFeedItem, ...prev.entry.comments]
                      //   }
                      // });
                    }
                  })
                }
              >
                <ChatFeed
                  messages={m} // Boolean: list of message objects
                  // isTyping={isTyping} // Boolean: is the recipient typing
                  // bubbleStyles={{
                  //   text: {
                  //     fontSize: 10
                  //   },
                  //   chatbubble: {
                  //     borderRadius: 70,
                  //     padding: 40
                  //   }
                  // }}
                />
              </SubscriptionWrapper>
            );
          }}
        </Query>
        <Mutation<NewMessage, MessageMutation> mutation={ADD_MESSAGE}>
          {(addMessage, data) => {
            console.log(data);
            return (
              <Submit
                onSubmit={value => {
                  const m = {
                    variables: {
                      message: value,
                      user: "cjyx3f12y00es0151ycbbdcvx",
                      conversation: match.params.id
                      // timestamp: Date.now().toString()
                    }
                  };
                  console.log(m);
                  addMessage(m);
                }}
              />
            );
          }}
        </Mutation>
      </IonContent>
    </>
  );
};

export default Details;
