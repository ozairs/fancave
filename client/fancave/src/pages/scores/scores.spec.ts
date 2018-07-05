import moment from 'moment-timezone';
import { IonicModule, NavController, ViewController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScoresPage } from './scores';

import {ViewControllerMock} from '../../../test-config/mocks';
import { TeamsProviderMock, NavParamsMock} from '../../../test-config/mocks';
import { Storage } from '@ionic/storage'
import { StorageMock } from '../../../test-config/mocks';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { Observable } from 'rxjs/Observable';
import { TeamsProvider } from '../../providers/teams/teams';
import { NavParams } from 'ionic-angular';

let component: ScoresPage;
let fixture: ComponentFixture<ScoresPage>;
let debug: DebugElement;
let debugList: DebugElement[];
let element: HTMLElement;

describe('Page: Scores Page', () => {
    
    //create test environment
    beforeEach(async(() => { //async reads external files async
        
        TestBed.configureTestingModule({ 
 
            declarations: [FanCaveApp, ScoresPage], //component to test
 
            providers: [
                NavController,
                {
                    provide: NavParams,
                    useClass: NavParamsMock
                },
                {
                    provide: ViewController,
                    useClass: ViewControllerMock
                },
                {
                    provide: TeamsProvider,
                    useClass: TeamsProviderMock
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
 
        fixture = TestBed.createComponent(ScoresPage); //component
        component = fixture.componentInstance; //instance
    });
  
    //invoke the test case (call provider and display data inside view)
    it('displays nhl score with Toronto', () => {

        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('nhl', '02-12-2017', false).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page (home team)
            expect(element.textContent).toContain('Toronto'); 
            expect(element.textContent).toContain('0'); 
		});       
    });

    it('displays nba score with Detroit', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('nba', '02-12-2017', false).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (home team)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('Detroit'); 
            expect(element.textContent).toContain('109'); 
		});      
    });

    it('displays mlb score with Houston', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('mlb', '02-12-2017', false).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('Houston'); 
            expect(element.textContent).toContain('8'); 
		});      
    });

    it('displays nfl score with New England', () => {
        
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('nfl', '02-04-2018', false).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('New England');  
		});      
    });

    //switching leagues
    it('view scores from different leagues', () => {
        
        fixture.detectChanges();

        //clicking the nba button will trigger call to obtain news 
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        //inject observable since actual provider is not called
        spyOn(teamsService, 'getScores').and.returnValue(Observable.of(true));
        
        //list of debug elements
        debugList = fixture.debugElement.queryAll(By.css('button'));
        //find the debug element
        for (var i=0; i < debugList.length; i++) {
            if (debugList[i].nativeElement.innerText.indexOf('NBA') >= 0) {
                // element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
            else if (debugList[i].nativeElement.innerText.indexOf('MLB') >= 0) {
                // element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
            else if (debugList[i].nativeElement.innerText.indexOf('NFL') >= 0) {
                // element = debugList[i].nativeElement;
                debugList[i].triggerEventHandler('click', null);
            }
        }

        var date = moment().tz('America/Toronto').format('YYYY-MM-DD');
        //news feed should have been called twice (second time with 'mlb')
        expect(teamsService.getScores).toHaveBeenCalledTimes(3);
        //news feed should be invoked when clicking the NBA button
        expect(teamsService.getScores).toHaveBeenCalledWith('nba', date, false);
    });

    it('refresh nba scores from in-game to final', () => {
        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('nba', '02-12-2017', true).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('FINAL'); 
		});      
    });

    it('change date to 02-13-2018', () => {

        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('nba', '02-13-2017', false).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            element = debug.nativeElement;
    
            //assert data is on the page
            expect(element.textContent).toContain('Philadelphia'); 
		});      
    });

    it('change date where no scores exist', () => {

        //get the data
        var teamsService = fixture.debugElement.injector.get(TeamsProvider);
        teamsService.getScores('nba', '01-01-2017', false).subscribe( (scores) => {
            component.scores = scores;
            fixture.detectChanges();
            
            //find the data (returns first match)
            debug = fixture.debugElement.query(By.css('ion-card ion-card-content ion-list ion-item'));
            //assert data is on the page
            expect(debug).toBeNull(); 
		});      
    });


    //destroy the component instance
    afterEach(() => {
        fixture.destroy();
        component = null;
        debug = null;
        element = null;
    });
 
});