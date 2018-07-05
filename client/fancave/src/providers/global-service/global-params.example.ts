export const AUTH_CONFIG: any = {
	domain: '',
	clientID: '',

	database : {
		realm: 'Username-Password-Authentication',
		audience: '',
		scope: 'openid',
	},
	
	social : {
		connection: 'google-oauth2',
		responseType: 'id_token token',
		redirectUri: ''
	}
};