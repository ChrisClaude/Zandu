export type AuthContextType = {
	signinRedirectCallback: () => void,
	parseJwt: (token: string) => string,
	signinRedirect: () => void,
	isAuthenticated: () => boolean,
	signinSilent: () => void,
	signinSilentCallback: () => void,
	getUser: () => Promise<any> | null,
	createSigninRequest: () => any,
	logout: () => void,
	signoutRedirectCallback: () => void,
};
