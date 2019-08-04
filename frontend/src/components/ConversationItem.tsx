import React from "react";
import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
// import { User } from "../api/User";

export type ConversationItemProps = {
  //   users: User;
  name: string;
  conversationId: string;
  snippet: string;
};
export const ConversationItem: React.FC<ConversationItemProps> = ({
  name,
  conversationId,
  snippet
}) => {
  return (
    <IonItem href={`/conversations/details/${conversationId}`}>
      <IonAvatar style={{ marginRight: "1rem" }}>
        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
      </IonAvatar>
      <IonLabel>
        <h3>{name}</h3>
        <p>{snippet}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ConversationItem;
