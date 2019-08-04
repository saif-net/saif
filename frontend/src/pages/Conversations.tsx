import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import ConversationItem from "../components/ConversationItem";
import { gql } from "apollo-boost";

import { Query, QueryProps } from "react-apollo";
import { Conversation } from "../api/Conversation";
import { Message } from "../api/Message";

const GET_CONVERSATIONS = gql`
  query {
    allConversations {
      id
      name
      messages(first: 5) {
        message
      }
    }
  }
`;
interface ConversationQuery {
  allConversations: Array<Conversation>
}

const Conversations: React.FunctionComponent<RouteComponentProps> = ({
  history
}) => {
  
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Conversations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList style={{ paddingLeft: "0" }}>
          <Query<ConversationQuery> query={GET_CONVERSATIONS}>
            {({loading, data, error}) => {
              if (loading) return "Loading...";
              console.log(error)
              if (error) return `Error! ${error.message}`;
              if (!data) { return `Error!`}
              console.log(data)
              return (
                <>
                {data.allConversations.map(c => (
                  <ConversationItem key={c.id} name={c.name} conversationId={c.id} snippet={c.messages.length > 0 ? c.messages.map((m: Message) => m.message).reduce((acc, cur) => cur): ""} />
                ))}
                </>
              );
            }}
          </Query>
        </IonList>
      </IonContent>
    </>
  );
};

export default Conversations;
