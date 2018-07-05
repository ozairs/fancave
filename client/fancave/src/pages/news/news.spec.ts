import { IonicModule, NavController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewsPage } from './news';

import { NewsProvider } from './../../providers/news/news';
import { NewsProviderMock} from '../../../test-config/mocks';
import { Storage } from '@ionic/storage'
import { StorageMock } from '../../../test-config/mocks';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { Observable } from 'rxjs/Observable';

let component: NewsPage;
let fixture: ComponentFixture<NewsPage>;
let debug: DebugElement;
let debugList: DebugElement[];
let element: HTMLElement;

describe('Page: News Page', () => {
    
    //create test environment
    beforeEach(async(() => { //async reads external files async
        
        TestBed.configureTestingModule({ 
 
            declarations: [FanCaveApp, NewsPage], //component to test
 
            providers: [
                NavController,
                {
                    provide: NewsProvider,
                    useClass: NewsProviderMock
                },
                {
                    provide: Storage,
                    useClass: StorageMock
                },
                {
                    provide: GlobalServiceProvider,
                    useClass: GlobalServiceProviderMock
                }
            ],
 
            imports: [
                IonicModule.forRoot(FanCaveApp)
            ]
 
        }).compileComponents();
 
    }));
    
    //create the component instance
    beforeEach(() => {
 
        fixture = TestBed.createComponent(NewsPage); //component
        component = fixture.componentInstance; //instance

    });
  
    //invoke the test case (call provider and display data inside view)
    it('displays nhl articles', () => {
        
        //get the data
        var newsService = fixture.debugElement.injector.get(NewsProvider);
        var news = newsService.getNews('nhl', false);
        component.articles = news;

        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content'));
        element = debug.nativeElement;
 
        //assert data is on the page
        expect(element.textContent).toContain('Vegas Golden Knights'); 
        expect(element.textContent).toContain('Oct 7, 2017'); 
    });

    it('displays nba articles', () => {
        
        //get the data
        var newsService = fixture.debugElement.injector.get(NewsProvider);
        var news = newsService.getNews('nba', false);
        component.articles = news;

        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content'));
        element = debug.nativeElement;
 
        //assert data is on the page
        expect(element.textContent).toContain('Knicks'); 
        expect(element.textContent).toContain('Oct 6, 2017'); 
    });

    it('displays mlb articles', () => {
        
        //get the data
        var newsService = fixture.debugElement.injector.get(NewsProvider);
        var news = newsService.getNews('mlb', false);
        component.articles = news;

        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content'));
        element = debug.nativeElement;
 
        //assert data is on the page
        expect(element.textContent).toContain('Dodgers'); 
        expect(element.textContent).toContain('Oct 7, 2017'); 
    });

    it('displays nfl articles', () => {
        
        //get the data
        var newsService = fixture.debugElement.injector.get(NewsProvider);
        var news = newsService.getNews('nfl', false);
        component.articles = news;

        //trigger data binding
        fixture.detectChanges();
        
        //find the data (returns first match)
        debug = fixture.debugElement.query(By.css('ion-card ion-card-content'));
        element = debug.nativeElement;
 
        //assert data is on the page
        expect(element.textContent).toContain('Jackson'); 
    });

    //switching leagues
    it('view articles from different leagues', () => {
        
        //clicking the nba button will trigger call to obtain news 
        var newsService = fixture.debugElement.injector.get(NewsProvider);
        //inject observable since actual provider is not called
        spyOn(newsService, 'getNews').and.returnValue(Observable.of(true));
        
        //list of debug elements
        debugList = fixture.debugElement.queryAll(By.css('button'));
        //find the debug element
        for (var i=0; i < debugList.length; i++) {
            if (debugList[i].nativeElement.innerText.indexOf('NBA') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
            else if (debugList[i].nativeElement.innerText.indexOf('MLB') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
            else if (debugList[i].nativeElement.innerText.indexOf('NFL') >= 0) {
                element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
        }
        //news feed should be invoked when clicking the NBA button
        expect(newsService.getNews).toHaveBeenCalledWith('nba', false);
        //news feed should have been called twice (second time with 'mlb')
        expect(newsService.getNews).toHaveBeenCalledTimes(3);
    });

    //destroy the component instance
    afterEach(() => {
        fixture.destroy();
        component = null;
        debug = null;
        element = null;
    });
 
 
});