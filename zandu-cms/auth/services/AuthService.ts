import { Log, UserManager, WebStorageStateStore } from 'oidc-client';
import {AuthContextType} from '@/auth/types';
import { IDENTITY_CONFIG, METADATA_OIDC } from '../AuthConstant';

export default class AuthService implements AuthContextType {
	UserManager;

	constructor() {
		this.UserManager = new UserManager({
			...IDENTITY_CONFIG,
			userStore: new WebStorageStateStore({ store: window.sessionStorage }),
			metadata: {
				...METADATA_OIDC,
			},
		});
		// Logger
		// Log.logger = console;
		// Log.level = Log.DEBUG;
		this.UserManager.events.addUserLoaded((user) => {
			if (window.location.href.indexOf('/auth/callback') !== -1) {
				this.navigateToScreen();
			}
		});
		this.UserManager.events.addSilentRenewError((e) => {
			console.log('---> silent renew error', e.message);
		});

		this.UserManager.events.addAccessTokenExpired(() => {
			console.log('---> token expired');
			this.signinSilent();
		});
	}

	signinRedirectCallback = () => {
		this.UserManager.signinRedirectCallback().then((user) => {
			window.history.replaceState({},
				window.document.title,
				window.location.origin + window.location.pathname);
		}).catch((error) => {
			// this.signinRedirect();
			console.error(error);
		});
	};


	getUser = async () => {
		let user = await this.UserManager.getUser();
		if (!user) {
			user = await this.UserManager.signinRedirectCallback();
		}
		return user;
	};

	parseJwt = (token: string) => {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	};


	signinRedirect = () => {
		localStorage.setItem('redirectUri', window.location.pathname);
		this.UserManager.signinRedirect({});
	};


	navigateToScreen = () => {
		window.location.replace('/');
	};


	isAuthenticated = () => {
		const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.NEXT_PUBLIC_AUTH_URL}:${process.env.NEXT_PUBLIC_IDENTITY_CLIENT_ID}`));
		return (!!oidcStorage && !!oidcStorage.access_token);
	};

	signinSilent = () => {
		this.UserManager.signinSilent()
			.then((user) => {
				console.log('---> signed in', user);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	signinSilentCallback = () => {
		this.UserManager.signinSilentCallback();
	};

	createSigninRequest = () => {
		return this.UserManager.createSigninRequest();
	};

	logout = () => {
		this.UserManager.signoutRedirect({
			id_token_hint: localStorage.getItem('id_token'),
		});
		this.UserManager.clearStaleState();
	};

	signoutRedirectCallback = () => {
		this.UserManager.signoutRedirectCallback().then(() => {
			localStorage.clear();
			window.location.replace(process.env.NEXT_PUBLIC_PUBLIC_URL);
		});
		this.UserManager.clearStaleState();
	};
}
