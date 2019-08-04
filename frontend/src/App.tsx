import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { chatboxes, arrowDropright, contact } from "ionicons/icons";
import Tab1 from "./pages/Intro";
import Tab2 from "./pages/Conversations";
import Tab3 from "./pages/Profile";
import ConversationDetails from "./pages/Conversation";

import { ApolloProvider } from "react-apollo";

/* Core CSS required for Ionic components to work properly */
import "@ionic/core/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/core/css/normalize.css";
import "@ionic/core/css/structure.css";
import "@ionic/core/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/core/css/padding.css";
import "@ionic/core/css/float-elements.css";
import "@ionic/core/css/text-alignment.css";
import "@ionic/core/css/text-transformation.css";
import "@ionic/core/css/flex-utils.css";
import "@ionic/core/css/display.css";
import "./App.css";
import { client } from "./utils/client";

const App: React.FunctionComponent = () => (
  <IonApp>
    <IonReactRouter>
      <IonPage id="main">
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/:tab(intro)" component={Tab1} exact={true} />
            <Route path="/:tab(conversations)" component={Tab2} exact={true} />
            <Route
              path="/:tab(conversations)/details/:id"
              component={ConversationDetails}
            />
            <Route path="/:tab(profile)" component={Tab3} />
            <Route exact path="/" render={() => <Redirect to="/intro" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/intro">
              <IonIcon icon={arrowDropright} />
              <IonLabel>Intro</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/conversations">
              <IonIcon icon={chatboxes} />
              <IonLabel>Conversations</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/profile/me">
              <IonIcon icon={contact} />
              <IonLabel>My Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonPage>
    </IonReactRouter>
  </IonApp>
);

const StatefulApp = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default StatefulApp;
