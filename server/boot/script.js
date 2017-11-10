module.exports = function (app, callback) {
	
	/**
	 * obtains an access token using a provided refresh token that will be used to call the sports API provider
	 */
	setTimeout(function () {
		console.log('<< getting access token for sports datasource');	
		//access token to exchange refresh token for a new access token
		app.dataSources.sportsDS.getToken(function (err, response) {
			//error making request
			if (err) {
				console.log('Unable to obtain token with error `%s`', err.message);
				console.log('Returning static sports data');
			}
			//successfully obtained token
			else {
				//save the refresh and access token into a global node.js variable
				global.access_token = JSON.parse(response).access_token;
				global.refresh_token = JSON.parse(response).refresh_token;
				// console.log("ys access token " + global.access_token);
				// console.log("ys refresh token " + global.refresh_token);
			}
			console.log('>> getting access token for sports datasource');
		});
		callback();
	}, 1000);
};