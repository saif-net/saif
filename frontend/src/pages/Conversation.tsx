import React, { useState } from "react";

import { RouteComponentProps } from "react-router";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonCol,
  IonGrid,
  IonRow
} from "@ionic/react";
import { ChatFeed, Message } from "react-chat-ui";
import { Query, Subscription, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Message as MessageType } from "../api/Message";
import { User } from "../api/User";

interface ConversationDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GET_MESSAGES = gql`
  subscription getMessages($id: ID) {
    Message(filter: { node: { conversation: { id: $id } } }) {
      node {
        id
        message
        timestamp
        userId
        # user {
        #   id
        # }
      }
    }
  }
`;

const ADD_MESSAGE = gql`
  mutation AddMessage($message: String, $conversation: ID, $user: ID) {
    createMessage(message: $message, conversationId: $conversation, userId: $user) {
      id
      message
      timestamp
    }
  }
`;

interface MessagesQuery {
  Message: {
    node: {
      id: string;
      message: MessageType;
      userId: string
    };
  };
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
  conversation: string
  user: string
  // timestamp: string;
}

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
        <Subscription<MessagesQuery, MessagesInput>
          subscription={GET_MESSAGES}
          variables={{ id: match.params.id }}
        >
          {({ loading, data, error }) => {
            if (error) {
              console.log(error);
              return `Error! ${error.message}`;
            }
            if (!data) {
              return `No Messages!`;
            }
            console.log(data);
            const newItem =  new Message({ id: data.Message.node.userId, message: data.Message.node.message }) 
            return (
              <ChatFeed
                messages={} // Boolean: list of message objects
                // isTyping={isTyping} // Boolean: is the recipient typing
                // hasInputField={true} // Boolean: use our input, or use your own
                // showSenderName // show the name of the user who sent the message
                // bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                // JSON: Custom bubble styles
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
            );
          }}
        </Subscription>
        <Mutation<NewMessage, MessageMutation> mutation={ADD_MESSAGE}>
          {(addMessage, data) => {
            console.log(data)
            return (
              <IonContent>
                <IonGrid>
                  <IonRow>
                    {/* <IonCol size="6"> */}
                    <IonInput
                      autofocus
                      placeholder="Message ..."
                      value={currentMessage}
                      onChange={e =>
                        // @ts-ignore
                        e.target ? setMessage(e.target.value) : null
                      }
                    />
                    {/* </IonCol> */}
                    {/* <IonCol size="3"> */}
                    <IonButton
                      onClick={() =>
                        addMessage({
                          variables: {
                            message: currentMessage,
                            user: "cjyx3f12y00es0151ycbbdcvx",
                            conversation: match.params.id,
                            // timestamp: Date.now().toString()
                          }
                        })
                      }
                    >
                      Send
                    </IonButton>
                    {/* </IonCol> */}
                  </IonRow>
                </IonGrid>
              </IonContent>
            );
          }}
        </Mutation>
      </IonContent>
    </>
  );
};

export default Details;
