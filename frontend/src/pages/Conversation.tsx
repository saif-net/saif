import React, { useState } from "react";

import { RouteComponentProps } from "react-router";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput
} from "@ionic/react";
import { ChatFeed, Message } from "react-chat-ui";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Message as MessageType } from "../api/Message";

interface ConversationDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GET_MESSAGES = gql`
subscription {
  Message(filter: {node: {conversation: {id: $id}}}) {
    node {
      id
      messages
      timestamp
      user {
        name
      }
    }
  }
}
`;

interface MessagesQuery {
  Message: {
    node: {
      id: string;
      messages: Array<MessageType>;
    };
  };
}

interface MessagesInput {
  id: string;
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
        <Query<MessagesQuery, MessagesInput> query={GET_MESSAGES}>
          {({ loading, data, error }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            if (!data) {
              return `Error!`;
            }
            console.log(data);
            return (
              <ChatFeed
                messages={data} // Boolean: list of message objects
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
        </Query>
        <IonContent>
          <IonInput autofocus placeholder="Message ..." />
        </IonContent>
      </IonContent>
    </>
  );
};

export default Details;
