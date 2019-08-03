import React from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonAvatar,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/react";

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
        <IonList style={{paddingLeft: '0'}}>
          <IonItem href="/conversations/details/john">
            <IonAvatar style={{marginRight: '1rem'}}>
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonLabel>
              <h3>John Doe</h3>
              <p>hey dude what's up ...</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </>
  );
};

export default Conversations;
