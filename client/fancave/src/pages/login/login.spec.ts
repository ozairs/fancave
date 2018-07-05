import { TabsPage } from './../tabs/tabs';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { LoginPage } from './login';
import { IonicModule, NavController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthServiceProviderMock, InAppBrowserMock} from '../../../test-config/mocks';
import { Storage } from '@ionic/storage'
import { StorageMock } from '../../../test-config/mocks';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { Events } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

let component: LoginPage; 
let fixture: ComponentFixture<LoginPage>;

describe('Page: Login Page', () => {
    
    //create test environment
    beforeEach(async(() => { //async reads external files async
        
        TestBed.configureTestingModule({ 
 
            declarations: [FanCaveApp, LoginPage], //component to test
            // {
            //     provide: NavController,
            //     useClass: NavMock
            // },
 
            providers: [
                NavController,
                {
                    provide: AuthServiceProvider,
                    useClass: AuthServiceProviderMock
                },
                {
                    provide: Storage,
                    useClass: StorageMock
                },
                {
                    provide: GlobalServiceProvider,
                    useClass: GlobalServiceProviderMock
                },
                {
                    provide: InAppBrowser,
                    useClass: InAppBrowserMock
                }
            ],
 
            imports: [
                IonicModule.forRoot(FanCaveApp)
            ]
 
        }).compileComponents();
 
    }));
    
    //create the component instance
    beforeEach(() => {
 
        fixture = TestBed.createComponent(LoginPage); //component
        component = fixture.componentInstance; //instance
    });
  
    //invoke the test case (call provider and display data inside view)
    it('validate login with good username and password', () => {
        
        //clicking the submit button will trigger call to authentication service
        var navCtrl = fixture.debugElement.injector.get(NavController);

        //NOTE: commented code below is unable to set form fields, so set them instead via the component variables

        //user enters username and password 
		// let username = fixture.debugElement.query(By.css('ion-input[formControlName=username]'));
		// let password = fixture.debugElement.query(By.css('ion-input[formControlName=password]'));
		// username.nativeElement.value = "ozair@example.com"; 
        // password.nativeElement.value = "passw0rd";
        
        component.loginForm.controls['username'].setValue('ozair@example.com');
        component.loginForm.controls['password'].setValue('passw0rd');
    
        fixture.detectChanges();
    
        
        
        //after successful login, user navigates to TabsPage
        spyOn(navCtrl, 'push');

        let submit = fixture.debugElement.query(By.css('button[type=submit]'));
        submit.triggerEventHandler('click', null);

        expect(navCtrl.push).toHaveBeenCalledWith(TabsPage);
    });

    //invoke the test case (call provider and display data inside view)
    it('validate login with bad username and password', () => {
    
        //NOTE: commented code below is unable to set form fields, so set them instead via the component variables

        //user enters username and password 
		// let username = fixture.debugElement.query(By.css('ion-input[formControlName=username]'));
		// let password = fixture.debugElement.query(By.css('ion-input[formControlName=password]'));
		// username.nativeElement.value = "ozair@example.com"; 
        // password.nativeElement.value = "bad";
        
        component.loginForm.controls['username'].setValue('ozair@example.com');
        component.loginForm.controls['password'].setValue('bad');
    
        fixture.detectChanges();
        
        //click login button
        let submit = fixture.debugElement.query(By.css('button[type=submit]'));
        submit.triggerEventHandler('click', null);

        fixture.detectChanges();
        
        //bad password will reset the password form field
        let error = fixture.debugElement.query(By.css('form ion-list ion-item p'));
		
        expect(error).toBeTruthy();
    });

    //user signup
    it('validate login with google SSO', () => {

        var navCtrl = fixture.debugElement.injector.get(NavController);
        //trigger call to authentication service
        spyOn(navCtrl, 'push');

        let googleBtn = fixture.debugElement.query(By.css('button[color=danger]'));
        googleBtn.triggerEventHandler('click', null);
        
        expect(navCtrl.push).toHaveBeenCalledWith(TabsPage);
    });

    //destroy the component instance
    afterEach(() => {
        fixture.destroy();
        component = null;
    });
 
 
});