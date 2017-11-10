export const AUTH_CONFIG: any = {
	domain: 'ozairs.auth0.com',
	clientID: 'r6n0rutGmBlabRmu3seS7oeXpc8HG6Mh',

	database : {
		realm: 'Username-Password-Authentication',
		audience: 'https://www.superfanz.ca/',
		scope: 'openid',
	},
	
	social : {
		connection: 'google-oauth2',
		responseType: 'id_token token',
		redirectUri: 'https://megafanz.mybluemix.net/index.html#/login'
	}
};