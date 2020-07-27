import {
    ApolloClient as _ApolloClient,
    InMemoryCache,
    ApolloLink
} from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import Cookies from 'universal-cookie';
import omitDeep from 'omit-deep-lodash';
import { getMainDefinition } from 'apollo-utilities';
import GetByPathWithDefault from './GetByPathWithDefault';

const cookies = new Cookies();

const keysToOmit = ['__typename'];

const authLink = new ApolloLink((operation, forward) => {
    const token = cookies.get('jwtToken');
    
    if (token) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }

    const def = getMainDefinition(operation.query);
    if (def && def.operation === 'mutation') {
        operation.variables = omitDeep(operation.variables, keysToOmit);
    }

    return forward(operation);
});

const ApolloClient = new _ApolloClient({
    link: authLink.concat(createUploadLink({
        uri: 'http://127.0.0.1:5000/graphql',
        fetch: (uri, options) => {
            return fetch(uri, options).then((response) => {
                return (response.json());
            }).then((json) => {
                // If token is expired
                if (GetByPathWithDefault(json, 'errors[0].message') === 'jwt expired') {
                    window.location.replace('/logout');
                    return;
                }

                return {
                    ok: true,
                    text: () => new Promise((resolve, reject) => resolve(JSON.stringify(json))),
                    json: () => new Promise((resolve, reject) => resolve(json))
                };
            });
        }
    })),
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
