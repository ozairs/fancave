'use strict';

const image_url = 'assets/img/';

/**
 * set of functions to retrieve a set of teams for a given league from a local file, and
 * sports scores for a given team or date from a sports provider
 */
module.exports = function (Team) {

	//returns a set of scores for a given league and date
	Team.getScores = function (league, date, callback) {
		console.log('<< getScores');
		let data = [];
		//request to obtain a set of scores for a given league and date using a previously obtained access token
		Team.app.dataSources.sportsDS.getScores(league, date, global.access_token, function (err, response) {
			if (err) {
				//access token expired - use refresh token to obtain a new access token
				if (err.message) {

					Team.app.dataSources.sportsDS.getToken(function (err, response) {
						//unable to obtain a new access token with a refresh token, so return local data
						if (err) {
							console.log("Unable to call scores service with error %s", err.message);
							//return static data unable when news service is unavailable
							console.log("returning data file file");
							var data = require('../../server/sample-data/scores.json')[league];
							if (!data) data = [];
							return callback(null, data);
						}
						// return callback(err.message); //error making request

						//save the access and refresh token
						global.access_token = JSON.parse(response).access_token;
						global.refresh_token = JSON.parse(response).refresh_token;
						// console.log("ys access token " + global.access_token);
						// console.log("ys refresh token " + global.refresh_token);

						//re-request the set of news articles using the previously obtained access token
						Team.app.dataSources.sportsDS.getScores(league, date, global.access_token, function (err, response) {
							//error occured calling news provider with new access token so return local data
							if (err) {
								console.log("Unable to call scores service with error %s", err.message);
								//return static data unable when news service is unavailable
								console.log("returning data file file");
								var data = require('../../server/sample-data/scores.json')[league];
								if (!data) data = [];
								return callback(null, data);
							}
							//format the scores
							data = Team.parseScores(league, response);
							if (!data) data = [];
							callback(null, data);
						});
					});
				}
				else {
					console.log("Unable to call scores service with error %s", err);
					//return static data unable when news service is unavailable
					console.log("returning data file");
					var data = require('../../server/sample-data/scores.json')[league];
					if (!data) data = [];
					return callback(null, data);
				}
			}
			//successfully called news provider service
			else {
				data = Team.parseScores(league, response);
				if (!data) data = [];
				console.log('>> getScores');
				return callback(null, data);
			}
			console.log('>> getScores');
		});

		/**
		 * parse the response to include the appropriate data
		 */
		Team.parseScores = function (league, response) {
			console.log('<< parseScores');
			let data = [];
			//check for valid response
			if (response.query.results) {

				var scores = response.query.results.results['sports-content'].schedule['sports-event'];

				if (!scores) return [];

				//depending on the data set, verify that an error is returned
				if (!(scores instanceof Array)) {
					var score = this.buildScoreItem(scores, league);
					data.push(score);
				}
				else {
					for (let scoreObj of scores) {
						var score = this.buildScoreItem(scoreObj, league);
						data.push(score);
					}
				}

			}
			else if (response.error) {
				console.log("Error obtaining scores feed." + err.toString());
			}
			else {
				console.log("No scores found with matching criteria");
			}
			return data;
		}
		console.log('>> parseScores');
	}

	/**
	 * helper function to parse and format a scores item
	 */
	Team.buildScoreItem = function (scoreObj, league) {
		console.log('<< buildScoreItem');
		var score = {
			"away": scoreObj.team[0]['team-metadata'].name.full.replace('New York', scoreObj.team[0]['team-metadata'].name.abbreviation),
			"awayScore": scoreObj.team[0]['team-stats'].score,
			"awayLogo": image_url + league + '/' + scoreObj.team[0]['team-metadata'].name.full.toLowerCase().replace('new york', ''),
			"home": scoreObj.team[1]['team-metadata'].name.full.replace('New York', scoreObj.team[1]['team-metadata'].name.abbreviation),
			"homeScore": scoreObj.team[1]['team-stats'].score,
			"homeLogo": image_url + league + '/' + scoreObj.team[1]['team-metadata'].name.full.toLowerCase().replace('new york', ''),
			"status": scoreObj['event-metadata']['sports-property'][1].value,
			"url": scoreObj['event-metadata']['sports-property'][0].value
		}
		score = Team.fixDupTeams(score);
		console.log('>> buildScoreItem');
		return score;
	}

	/**
	 * change abbreviations to fully qualified names for naming consistency
	 */
	Team.fixDupTeams = function (score) {
		console.log('<< fixDupTeams');
		//home teams
		if (score.home.toLowerCase() === 'nyr') {
			score.home = 'NY Rangers'
		}
		else if (score.home.toLowerCase() === 'nyi') {
			score.home = 'NY Islanders'
		}
		else if (score.home.toLowerCase() === 'ny') {
			score.home = 'NY Knicks'
		}
		else if (score.home.toLowerCase() === 'chi cubs') {
			score.home = 'Cubs'
		}
		else if (score.home.toLowerCase() === 'chi white sox') {
			score.home = 'White Sox'
		}
		score['homeLogo'] = score['homeLogo'].toLowerCase().replace('new york', '');
		score['homeLogo'] = score['homeLogo'].toLowerCase().replace('chi white sox', '');
		score['homeLogo'] = score['homeLogo'].toLowerCase().replace('chi cubs', '');

		//away teams
		if (score.away.toLowerCase() === 'nyr') {
			score.away = 'NY Rangers'
		}
		else if (score.away.toLowerCase() === 'nyi') {
			score.away = 'NY Islanders'
		}
		else if (score.away.toLowerCase() === 'ny') {
			score.away = 'NY Knicks'
		}
		else if (score.away.toLowerCase() === 'chi cubs') {
			score.away = 'Cubs'
		}
		else if (score.away.toLowerCase() === 'chi white sox') {
			score.away = 'White Sox'
		}
		score['awayLogo'] = score['awayLogo'].toLowerCase().replace('new york', '');
		score['awayLogo'] = score['awayLogo'].toLowerCase().replace('chi white sox', '');
		score['awayLogo'] = score['awayLogo'].toLowerCase().replace('chi cubs', '');
		console.log('>> fixDupTeams');
		return score;
	}

	/**
	 * return list of teams for a given league from a local file
	 */
	Team.getTeams = function (league, callback) {
		console.log('<< getTeams')
		var data = require('../../server/sample-data/teams.json')[league];
		if (!data) data = [];
		console.log('>> getTeams');
		return callback(null, data);
	}
}