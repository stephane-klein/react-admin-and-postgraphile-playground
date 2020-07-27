import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import { Admin, Resource } from 'react-admin'
import { useApolloClient } from '@apollo/react-hooks'
import pgDataProvider from 'ra-postgraphile'
import { UserList, UserEdit, UserCreate } from './Users'
import ApolloClient from './Apollo';
import AuthProvider from './AuthProvider';

const ReactAdminWrapper = () => {
    const [dataProvider, setDataProvider] = useState(null);
    const client = useApolloClient();

    useEffect(() => {
        (async () => {
            const dataProvider = await pgDataProvider(client);
            setDataProvider(() => dataProvider);
        })()
    }, [client]);

    return (
        dataProvider && (
            <Admin
                dataProvider={dataProvider}
                authProvider={AuthProvider}
            >
                <Resource
                    name="users"
                    list={UserList}
                    edit={UserEdit}
                    create={UserCreate}
                />
            </Admin>
        )
    );
}

const App = () => {
    return (
        <ApolloProvider client={ApolloClient}>
            <ReactAdminWrapper />
        </ApolloProvider>
    );
}

export default App;