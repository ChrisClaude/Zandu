export const IDENTITY_CONFIG = {
	authority: process.env.NEXT_PUBLIC_AUTH_URL,
	client_id: process.env.NEXT_PUBLIC_IDENTITY_CLIENT_ID,
	redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
	login: `${process.env.NEXT_PUBLIC_AUTH_URL}/account/login`,
	automaticSilentRenew: false,
	loadUserInfo: false,
	silent_redirect_uri: process.env.NEXT_PUBLIC_SILENT_REDIRECT_URL,
	post_logout_redirect_uri: process.env.NEXT_PUBLIC_LOGOFF_REDIRECT_URL,
	aud: 'IdentityServerApi',

	response_type: 'code',
	grantType: 'code',
	scope: 'openid profile IdentityServerApi Zandu.Core',
	webAuthResponseType: 'id_token token',
};

export const METADATA_OIDC = {
	issuer: process.env.NEXT_PUBLIC_AUTH_URL,
	jwks_uri: `${process.env.NEXT_PUBLIC_AUTH_URL  }/.well-known/openid-configuration/jwks`,
	authorization_endpoint: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/authorize`,
	token_endpoint: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/token`,
	userinfo_endpoint: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/userinfo`,
	end_session_endpoint: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/endsession`,
	check_session_iframe: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/checksession`,
	revocation_endpoint: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/revocation`,
	introspection_endpoint: `${process.env.NEXT_PUBLIC_AUTH_URL  }/connect/introspect`,
};
