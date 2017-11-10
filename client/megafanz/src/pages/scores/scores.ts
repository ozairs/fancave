import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { TeamsProvider } from './../../providers/teams/teams';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, PopoverController } from 'ionic-angular';
import moment from 'moment-timezone';

/**
 * class: ScoresPage
 * 
 * modal page that displays list of scores for a team(s) on a given date
 */
@Component({
	selector: 'page-scores',
	templateUrl: 'scores.html',
})
export class ScoresPage {
	private segment: string = 'nhl';
	private team: any = 'all';
	private scores: any = [];
	private date: any;

	/**
	 * 
	 * @param navCtrl 
	 * @param viewCtrl 
	 * @param navParams 
	 * @param loadingCtrl 
	 * @param popoverCtrl 
	 * @param teamsProvider 
	 * @param global 
	 */
	constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, private teamsProvider: TeamsProvider, private global: GlobalServiceProvider) {
		console.log("<< ScoresPage");
		//obtain scores for a specific team
		if (this.navParams.get('team')) {
			this.team = this.navParams.get('team');
		}

		//obtain scores for a league
		if (this.navParams.get('league')) {
			this.segment = this.navParams.get('league');
		}

		//filter scores based on date
		if (this.navParams.get('date')) {
			// this.date = this.navParams.get('date');
			this.date = moment(this.navParams.get('date'), 'YYYY-MM-DD').toISOString();
		}
		else {
			//moment formats current time with the appropriate timezone
			this.date = moment().tz('America/Toronto').format('YYYY-MM-DD');
		}
		this.getScores(this.date, false);
		console.log(">> ScoresPage");
	}

	/**
	 * tracks the current league and date (and formats it to ISO 8601 standard)
	 * @param button - currently selected league
	 */
	private onSegmentChange(button: string): void {
		console.log("<< onSegmentChange");
		this.segment = button;
		this.date = moment(this.date, moment.ISO_8601).format('YYYY-MM-DD');
		this.getScores(this.date, false);
		console.log(">> onSegmentChange");
	}

	/**
	 * tracks the current date when user changes it and triggers call to the update scores
	 */
	private changeDate() {
		console.log("<< changeDate");
		var convertDate = moment(this.date, moment.ISO_8601).format('YYYY-MM-DD');
		this.getScores(convertDate, false);
		console.log(">> changeDate");
	}

	/**
	 * retrieves list of scores based on the @param date. Optionally refetch scores data with the @param refresh flag
	 * @param date 
	 * @param refresh 
	 */
	private getScores(date, refresh) {
		console.log("<< getScores");

		this.global.presentLoading();
		//obtain the list of teams for a league
		this.teamsProvider.getTeams(this.segment).subscribe((teams: any) => {
			//get the scores for each team at a given date, optionally force a refresh
			this.teamsProvider.getScores(this.segment, date, refresh).subscribe((data: any) => {
				this.global.closeLoading();
				//return the data for all games
				if ((this.team === 'all')) {
					this.scores = data;
				}
				//scores array contains list of scores per date, so filter them based on the team name
				else {
					this.scores = data.filter((score) => {
						//home team matches current team
						if (this.team.toLowerCase().indexOf(score.home.toLowerCase()) >= 0) {
							return score;
						}
						//away team matches current team
						else if (this.team.toLowerCase().indexOf(score.away.toLowerCase()) >= 0) {
							return score;
						}
						//team name uses an abbreviation so need to parse team names
						else {
							var awayTeam = score.away.split(' ').join('-').toLowerCase();
							var homeTeam = score.home.split(' ').join('-').toLowerCase();

							awayTeam = awayTeam.split('la-')[1] || awayTeam.split('ny-')[1] || awayTeam.toLowerCase();
							homeTeam = homeTeam.split('la-')[1] || homeTeam.split('ny-')[1] || homeTeam.toLowerCase();

							if (this.team.toLowerCase().indexOf(awayTeam) >= 0 || this.team.toLowerCase().indexOf(homeTeam) >= 0) {
								return score;
							}

						}
					});
				}
			},
				error => {
					this.scores = []
					this.global.closeLoading();
				});
		});
		console.log(">> getScores");
	}

	/**
	 * refetch list of scores for the currently seleced date
	 * @param refresher - ui component for refreshing data
	 */
	private doRefresh(refresher) {
		console.log("<< doRefresh");
		refresher.complete();
		var convertDate = moment(this.date, moment.ISO_8601).format('YYYY-MM-DD');
		this.getScores(convertDate, true);
		console.log(">> doRefresh");
	}

	/**
	 * close the modal
	 */
	public closeModal() {
		this.viewCtrl.dismiss();
	}
}