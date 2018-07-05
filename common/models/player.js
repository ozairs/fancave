'use strict';

const image_url = 'assets/img/';
var mongodb = require('mongodb');

/**
 * set of functions to retrieve a set of professional players for a given league from a sport datasource
 * If the backend is unavailable, it will return a local copy of the data.
 * The news provider is Yahoo which requires an OAuth access token. If the OAuth token has expired,
 * it will obtain a new access token by using the provided refresh token.
 */
module.exports = function (Player) {

	//returns a set of players for a given league
	Player.getPlayers = function (league, callback) {
		console.log('<< getPlayers');
		let data = [];
		
		var mongoDS = Player.app.dataSources.mongo;
		//obtain data from database if available
		if (mongoDS) {
			var mongo_url = 'mongodb://' + mongoDS.settings.host + ':' + mongoDS.settings.port;
			//execute calls to database directly using mongo without using models
			mongodb.connect(mongo_url, function(err, client) {
				if (err) {
					console.log("Unable to connect to URL %s", mongo_url);
					throw err;
				}
				console.log("Connected to  database");
				var dbo = client.db(mongoDS.settings.database + mongoDS.settings.replicaSet);
				//perform query of players filtered by league
				dbo.collection("players").find( { 'league' : league} ).toArray(function(err, players) {
					if (err) {
						console.log('Error: ' + 'unable to find any players');
					} else {
						console.log('Successfully returned %s players from league %s', players.length, league);
						data = players;
					}
					client.close();
					callback(null, data);
				});				
			});
		}
		else {
			//request to obtain a set of players for a given league using a previously obtained access token
			Player.app.dataSources.sportsDS.getPlayers(league, global.access_token, function (err, response) {
				//error calling sports provider service
				if (err) {
					//access token expired - use refresh token to obtain a new access token
					if (err.error) {
						Player.app.dataSources.sportsDS.getToken(function (err, response) {
							if (err) {
								console.log("Unable to call players service with error %s", err.message);
								//return static data unable when news service is unavailable
								console.log("returning data file");
								var data = require('../../server/sample-data/players.json')[league];
								if (!data) data = [];
								return callback(null, data);
							}
				
							global.access_token = JSON.parse(response).access_token;
							global.refresh_token = JSON.parse(response).refresh_token;
							// console.log("ys access token " + global.access_token);
							// console.log("ys refresh token " + global.refresh_token);

							//re-request the set of news articles using the previously obtained access token
							Player.app.dataSources.sportsDS.getPlayers(league, global.access_token, function (err, response) {
								//error occured calling sports provider with new access token so return local data
								if (err) {
									console.log("Unable to call players service with error %s", err.message);
									//return static data unable when news service is unavailable
									console.log("returning data file ");
									var data = require('../../server/sample-data/players.json')[league];
									if (!data) data = [];
									return callback(null, data);
								}
								// return callback(err.message); //error making request
								//format the players list for the response
								data = Player.parsePlayers(response);
								callback(null, data);
							});
						});
					}
					//error calling sports provider service so return local data
					else {
						console.log("Unable to call players service with error %s", err.message.error.description);
						//return static data unable when news service is unavailable
						console.log("returning data file");
						var data = require('../../server/sample-data/players.json')[league];
						if (!data) data = [];
						return callback(null, data);
					}
					// return callback(err.message); //error making request
				}
				//successfully called sports provider service
				else {
					//format the players data for the response
					data = Player.parsePlayers(response);
					callback(null, data);
				}			
			});
			console.log('>> getPlayers');
		}
	}

	/**
	 * parse the response to include the appropriate data
	 */
	Player.parsePlayers = function(response) {
		console.log('<< parsePlayers');
		let data = [];
		//check for valid response
		if (response.fantasy_content) {
			// console.log("Successfully obtained players data.");

			var sport = response['fantasy_content'].games['0'].game[0].name;
			var league = response['fantasy_content'].games['0'].game[0].code;

			var numPlayers = response['fantasy_content'].games['0'].game[1].players.count;
			var players = response['fantasy_content'].games['0'].game[1].players;

			//build the players list
			for (var i=0; i< numPlayers; i++) {
				var playerObj = players[i];
				//obtain team name
				var team = playerObj.player[0][5].editorial_team_full_name || playerObj.player[0][6].editorial_team_full_name || playerObj.player[0][7].editorial_team_full_name;
				team = Player.filterTeamLogo(team); //fix team names 

				var position = playerObj.player[0][9].display_position || playerObj.player[0][8].display_position || playerObj.player[0][7].display_position || '';
				var picture = playerObj.player[0][9].image_url || playerObj.player[0][10].image_url || playerObj.player[0][11].image_url;

				var player = {
					"playerId" : i+1,
					"name": playerObj.player[0][2].name.full,
					"sport" : sport,
					"league" : league,
					"position": position,
					"team": team,
					"picture": picture,
					"logo": image_url + league + "/" + team.toLowerCase().replace(/ /g, '-') + ".svg",
					"twitter": "search?q=" + playerObj.player[0][2].name.full
				};
				data.push(player);
			}
		}
		else if (response.error) {
			console.log("Error obtaining players." + response.error.description);

		}
		else {
			console.log("No players found with matching criteria");
		}
		console.log('>> parsePlayers');
		return data;
	}

	/**
	 * Fix team names to remove extra characters and reflect name changes
	 */
	Player.filterTeamLogo = function (team) {
		console.log('<< filterTeamLogo');
		//remove the dot
		if (team.toLowerCase().indexOf('st. louis') >=0) {
		  return team.replace('.', '');
		}
		//team renamed 
		else if (team.toLowerCase().indexOf('los angeles angels') >=0) {
		  return team + ' of Anaheim';
		}
		else {
		  return team;
		}
		console.log('>> filterTeamLogo');
	}
};