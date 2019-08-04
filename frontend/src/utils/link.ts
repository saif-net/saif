import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

type Env = "dev" | "prod"

const ENV: Env = "dev"
let WS_URL: string = ""
let HTTP_URL: string = ""
// @ts-ignore
if (ENV == "prod") {
  WS_URL = "wss://subscriptions.us-west-2.graph.cool/v1/cjyx1izmn1l770182pw0b0knp"
  HTTP_URL = "https://api.graph.cool/simple/v1/cjyx1izmn1l770182pw0b0knp"
  // @ts-ignore
} else if (ENV == "dev") {
  WS_URL = "ws://localhost:60000/subscriptions/v1/cjyw85cne00040151bf2rji4x"
  HTTP_URL = "http://localhost:60000/simple/v1/cjyw85cne00040151bf2rji4x"
}

// Create an http link:
const httpLink = new HttpLink({
  uri: HTTP_URL
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
export const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);