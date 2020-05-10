import React from 'react';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput } from 'react-admin';

export const ContactList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="email" />
            <TextField source="firstname" />
            <DateField source="lastname" />
            <EditButton basePath="/contacts" />
        </Datagrid>
    </List>
);

const ContactTitle = ({ record }) => {
    return <span>Contact {record ? `"${record.firstname}"` : ''}</span>;
};

export const ContactEdit = (props) => (
    <Edit title={<ContactTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="email" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
        </SimpleForm>
    </Edit>
);

export const ContactCreate = (props) => (
    <Create title="Create a Contact" {...props}>
        <SimpleForm>
            <TextInput source="email" />
            <TextInput source="firstname" />
            <TextInput source="lastname" />
        </SimpleForm>
    </Create>
);