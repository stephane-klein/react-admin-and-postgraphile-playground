import {
    ApolloClient as _ApolloClient,
    InMemoryCache
} from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client'

const ApolloClient = new _ApolloClient({
    link: createUploadLink({
        uri: 'http://127.0.0.1:5000/graphql'
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore'
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all'
        }
    }
});

export default ApolloClient;
