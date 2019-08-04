import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const WS_URL = "http://localhost:60000/simple/v1/cjyw85cne00040151bf2rji4x"
const HTTP_URL = "ws://localhost:60000/subscriptions/v1/cjyw85cne00040151bf2rji4x"

// Create an http link:
const httpLink = new HttpLink({
  uri: WS_URL
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: HTTP_URL,
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