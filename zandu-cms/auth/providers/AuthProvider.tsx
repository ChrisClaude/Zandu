import * as React from 'react';
import AuthService from '../services/AuthService';
// eslint-disable-next-line import/named
import { AuthContextType } from '../types';

export const AuthContext = React.createContext<AuthContextType>({
	signinRedirectCallback: () => ({}),
	logout: () => ({}),
	signoutRedirectCallback: () => ({}),
	isAuthenticated: () => false,
	signinRedirect: () => ({}),
	signinSilentCallback: () => ({}),
	createSigninRequest: () => ({}),
	getUser: () => null,
	parseJwt: (token: string) => '',
	signinSilent: () => ({}),
});

AuthContext.displayName = 'AuthContext';

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
	authService: AuthContextType;

	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.authService = new AuthService();
	}

	render() {
		// eslint-disable-next-line react/destructuring-assignment
		return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
	}
}
