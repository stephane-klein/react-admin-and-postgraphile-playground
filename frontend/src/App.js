import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks';
import { Admin, Resource } from 'react-admin'
import { useApolloClient } from '@apollo/react-hooks'
import pgDataProvider from 'ra-postgraphile'
import { ContactList, ContactEdit, ContactCreate } from './Contacts'
import ApolloClient from './Apollo';

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
            <Admin dataProvider={dataProvider}>
                <Resource
                    name="contacts"
                    list={ContactList}
                    edit={ContactEdit}
                    create={ContactCreate}
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