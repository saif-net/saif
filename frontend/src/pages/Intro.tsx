import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  // IonIcon,
  // IonItem,
  // IonLabel,
  // IonList,
  // IonListHeader,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { book, build, colorFill, grid } from "ionicons/icons";
import React from "react";
import "./Intro.css";

const Tab1: React.FunctionComponent = () => {
  const appName = "Safety Net";
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{appName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard class="welcome-card">
          <img src="/assets/shapes.svg" alt="" />
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to {appName}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo, corrupti autem quo dolorum nemo officia! Ullam libero
              consequuntur officiis! Magnam rerum repudiandae iusto, pariatur
              aut dolorum vel tenetur aliquid ipsam.
            </p>
          </IonCardContent>
        </IonCard>
        {/* <IonList lines="none">
          <IonListHeader>
            <IonLabel>Resources</IonLabel>
          </IonListHeader>
          <IonItem href="https://ionicframework.com/docs/" target="_blank">
            <IonIcon slot="start" color="medium" icon={book} />
            <IonLabel>Ionic Documentation</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/building/scaffolding"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={build} />
            <IonLabel>Scaffold Out Your App</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/layout/structure"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={grid} />
            <IonLabel>Change Your App Layout</IonLabel>
          </IonItem>
          <IonItem
            href="https://ionicframework.com/docs/theming/basics"
            target="_blank"
          >
            <IonIcon slot="start" color="medium" icon={colorFill} />
            <IonLabel>Theme Your App</IonLabel>
          </IonItem>
        </IonList> */}
      </IonContent>
    </>
  );
};

export default Tab1;
