import { Observable } from 'rxjs/Observable';
import { Inject } from '@angular/core';
import { Events,  ModalOptions } from 'ionic-angular';
import { Modal } from 'ionic-angular/components/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {ModalController} from "ionic-angular";
import { mockApp, mockConfig, mockDeepLinker } from 'ionic-angular/util/mock-providers';

import { teams } from './mocks-teams'
import { players } from './mocks-players'
import { articles } from './mocks-news'
import { scores } from './mocks-scores'

/**
 * 
 * Provides the following mock services:
 * -StatusBarMock
 * -PlatformMock
 * -NavParamsMock
 * -NavMock
 * -DeepLinkerMock
 * -ViewControllerMock
 * -GlobalServiceProviderMock
 * -AuthServiceProviderMock
 * -ModalControllerMock
 * -PasswordValidatorMock
 * -TeamsProviderMock
 * -PlayersProviderMock
 * -NewsProviderMock
 * 
 */


/*
* @class PlatformMock
*/
export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

/*
* @class StatusBarMock
*/
export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

/*
* @class NavParamsMock
*/
export class NavParamsMock {
	get(param: string): any {
		if (param.indexOf('league') > 0) return "nba"
		else if (param.indexOf('team') > 0) return "Toronto Raptors";
		else if (param.indexOf('date') > 0) return "2017100608"
	}
}

/*
* @class NavMock
*/
export class NavMock {
 
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }
 
  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }
 
  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return ;
  }
}

/*
* @class DeepLinkerMock
*/
export class DeepLinkerMock {

}

/*
* @class GlobalServiceProviderMock
*/
export class GlobalServiceProviderMock {

	presentLoading() {

	}

	closeLoading() {
		
	}

	getLogin() {

	}

	setLogin() {
		
	}

	getUsername() {
		
	}
}

/*
* @class ViewControllerMock
*/
export class ViewControllerMock { 
	public _setHeader(): any { return {} }; 
	public _setIONContent(): any { return {} }; 
	public _setIONContentRef(): any { return {} }; 
	public _setNavbar(): any { return {} }; 
	public willEnter(): any { return {} }; 
	public didEnter(): any { return {} }; 
	public willLeave(): any { return {} }; 
	public didLeave(): any { return {} }; 
	public willUnload(): any { return {} }; 
	public didUnload(): any { return {} }; 
	public dismiss(): any { return {} }; 
	public onDidDismiss(): any { return {} }; 
	public onWillDismiss(): any { return {} }; 
	public enableBack(): any { return {} }; 
	public isFirst(): any { return {} }; 
	public isLast(): any { return {} }; 
	public pageRef(): any { return {} }; 
	public getContent(): any { return {} }; 
	public contentRef(): any { return {} }; 
	public hasNavbar(): any { return {} }; 
	public index(): any { return {} }; 
	public subscribe(): any { return {} }; 
	public getNav(): any { return {} }; 
	public getIONContent(): any { return {} }; 
	public writeReady:any = {
		emit(): void {

		},
		subscribe(): any {

		}
	};
	public readReady:any = {
		emit(): void {

		},
		subscribe(): any {

		}
	};
	public setBackButtonText(): any { return {} }; 
	public showBackButton(): any { return {} }; 	
	public _setContent(): any { return {} }; 
	public _setContentRef(): any { return {} }; 
	public _setFooter(): any { return {} }; 
	
}

/*
* @class AuthServiceProviderMock
*/
export class AuthServiceProviderMock {
	constructor(@Inject(Events) private events) {}

	login(username, password) {
		if (password.indexOf('bad') >= 0) {
			//publish event of user login
			this.events.publish('user:error', 'ozair@example.com');	
		}
		else {
			//publish event of user login
			this.events.publish('user:login', 'ozair@example.com');
		}
		
	}

	socialLogin() {
		//user logins with google and obtains an access token and triggers redirect back to application
		this.socialLoginCallBack();
	}

	socialLoginCallBack() {
		this.events.publish('user:login', 'ozairs@gmail.com');
	}

	public signup(username, password, firstName, lastName): void {

		if (password.indexOf('bad') >= 0) {
			//publish event of user login
			this.events.publish('user:error', 'ozair@example.com');	
		}
		else {
			//publish event of user login
			this.events.publish('user:login', 'ozair@example.com');
		}
	}
}

/*
* @class ModalControllerMock
*/
export class ModalControllerMock {
    constructor() {
        return new ModalController(mockApp(), mockConfig(), mockDeepLinker());
    }
	create(component: any, data?: any, opts?: ModalOptions): Modal {
		//app: App, component: any, data: any, opts: ModalOptions, config: Config, deepLinker: DeepLinker
		return new Modal(mockApp(), component, opts, data , mockConfig(), mockDeepLinker())
	}
};

/*
* @class PasswordValidatorMock
*/
 class PasswordValidatorMock {
  }

/*
* @class TeamsProviderMock
*/	
export class TeamsProviderMock {

	public getTeams(league): Observable<any> {
		return Observable.of(teams[league].teams);
	}

	public getScores(league, date, refresh): Observable<any> {
		//refresh test case
		if (refresh && league === 'nba') {
			var leagueScores = scores[league].dates[date]
			leagueScores[0].status = 'FINAL';
			return Observable.of(leagueScores);
		}
		else {
			return Observable.of(scores[league].dates[date]);
		}
		
	}
}
/*
* @class PlayersProviderMock
*/	
export class PlayersProviderMock {

	public getFilteredPlayers(league, filter): Observable<any> {
		return Observable.of(players[league].filter(p => {
			return p.name.toLowerCase().indexOf(filter) >= 0 || p.team.toLowerCase().indexOf(filter) >= 0
		  }));
	}
}

/*
* @class NewsProviderMock
*/	
export class NewsProviderMock {
	

	public getNews(league, refresh) {
		return articles[league];
	}
}

/*
* @class StorageMock
*/	
export class StorageMock {

	get(key: string): Promise<any> {
		return new Promise(resolve => {
			var session = {
				"expiry": "0",
				"access_token": "12345",
				"id_token": "abcdfe",
				"user": "ozair@example.com"
			}
			resolve(session);
		})
	}
	
	set(key: string, value: any): Promise<any> {
		return new Promise(resolve => {
			var session = {
				"expiry": "0",
				"access_token": "12345",
				"id_token": "abcdfe",
				"user": "ozair@example.com"
			}
			session = session[key] = value;
			resolve(session);
		})
	}

}


/*
* @class InAppBrowserMock
*/
export class InAppBrowserMock {

}

