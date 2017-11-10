import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * class: NewsProvider
 * retrieves a set of news articles from an API source based on the requested league
 * 
 */
@Injectable()
export class NewsProvider {
  private articles: any = [];

  /**
   * @constructor
   * @param http 
   */
  constructor(public http: Http) {
  }

  /**
   * retrieves a set of news articles for the requested league and stores it in a local variable.
   * news articles are refreshed if the refresh parameter is true
   * @param league - league name to filter articles
   * @param refresh - force a refetch for new articles
   */
  public getNews(league, refresh): any {
    console.log("<< getNews()");
    //return data, if its already populated
    if (this.articles[league] != undefined && !refresh) {
      console.log(">> getNews()");
      return Observable.of(this.articles[league]);
    }
    //fetch new articles for the league and store it locally
    else {
      return this.http.get('/api/news/feed?league=' + league).map((response) => {
        this.articles[league] = response.json()
        console.log(">> getNews()");
        return this.articles[league];
      })
    }
  }

}
