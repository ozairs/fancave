import { IonicModule } from 'ionic-angular';
import { async, TestBed } from '@angular/core/testing';

import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FanCaveApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBarMock, SplashScreenMock, PlatformMock } from './../../test-config/mocks';


describe('FanCaveApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FanCaveApp, TabsPage],
      imports: [
        IonicModule.forRoot(FanCaveApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  //invoked once before 
  beforeEach(() => {
    fixture = TestBed.createComponent(FanCaveApp);
    component = fixture.componentInstance;
  });

  //test case
  it('should be created', () => {
    expect(component instanceof FanCaveApp).toBe(true);
  });

  //test case
  it('should have two pages', () => {
    expect(component.loggedInPages.length).toBe(2);
  });

  it('displays the Tabspage  page to the user', () => {
    expect(component['rootPage']).toBe(TabsPage);
  });

});
