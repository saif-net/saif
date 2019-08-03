import React from "react";
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

const Tab3Page: React.FunctionComponent = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/*  
      // @ts-ignore */}
      <IonContent padding>
        <h1>Hello</h1>
        <p>Hi</p>
      </IonContent>
    </>
  );
};

export default Tab3Page;
