import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { NewsProvider } from './../../providers/news/news';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { PopoverController } from 'ionic-angular';

/**
 * Class: HomePage
 * 
 * This class retrieves a set of news articles based on the selected league
 */
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  private articles: any[];
  private segment: string = 'nhl';

  /**
   * @constructor
   * 
   * @param navCtrl 
   * @param storage 
   * @param popoverCtrl 
   * @param feedsService 
   * @param inAppBrowser 
   * @param loadingCtrl 
   * @param global 
   */
  constructor(public navCtrl: NavController, public storage: Storage, public popoverCtrl: PopoverController, public feedsService: NewsProvider, public loadingCtrl: LoadingController, public global: GlobalServiceProvider) {
  }

  /**
   * obtain the news upon loading the page
   */
  ionViewDidLoad() {
    this.getNews();
  }

  /**
   * set of buttons to track the currently selected league
   * @param button - current selected league
   */
  private onSegmentChange(button: string): void {
    console.log("<< onSegmentChange");
    this.segment = button;
    this.getNews();
    console.log(">> onSegmentChange");
  }

  /**
   * retrieves a set of news articles for a league
   */
  private getNews() {
    console.log("<< getNews");
    this.global.presentLoading();
    //trigger call to obtain news for currently selected league
    this.feedsService.getNews(this.segment, false).subscribe((data) => {
      this.global.closeLoading();

      this.articles = data;
    });
    console.log(">> getNews");
  }

  /**
   * fetch the latest news article (second flag 'true') even if content is available 
   * @param refresher - ui refresh (spinner) component 
   */
  private doRefresh(refresher) {
    console.log("<< doRefresh");
    //refetch the latest news articles
    this.feedsService.getNews(this.segment, true).subscribe((data) => {
      refresher.complete();
      this.articles = data;
    });
    console.log(">> doRefresh");
  }

}
