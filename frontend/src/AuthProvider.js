// import { toast } from 'react-toastify';
import gql from 'graphql-tag';
import ApolloClient from './Apollo';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AuthProvider = {
    login: ({ username, password }) => {
        return ApolloClient.mutate({
            mutation: gql`
                mutation authenticate($email: String!, $password: String!) {
                    authenticate(input: {email: $email, password: $password}) {
                        jwtToken
                    }
                }
            `,
            variables: {
                email: username,
                password: password
            }
        }).then((data) => {
            if (data.data.authenticate.jwtToken) {
                const currentDate = new Date();
                cookies.set(
                    'jwtToken',
                    data.data.authenticate.jwtToken,
                    {
                        domain: document.domain,
                        path: '/',
                        expires: new Date(
                            currentDate.getFullYear() + 10,
                            currentDate.getMonth(),
                            currentDate.getDay()
                        ),
                        sameSite: true
                    }
                );
                return Promise.resolve();
            } else {
                return Promise.reject();
            }
        });
    },
    logout: () => {
        cookies.remove(
            'jwtToken',
            {
                domain: document.domain,
                path: '/'
            }
        );
        return Promise.resolve();
    },
    checkAuth: () => cookies.get('jwtToken') ? Promise.resolve() : Promise.reject(),
    checkError: error => Promise.resolve(),
    getPermissions: params => Promise.resolve()
};

export default AuthProvider;
