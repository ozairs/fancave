import { TabsPage } from './../tabs/tabs';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { SignupPage } from './signup';
import { IonicModule, NavController } from 'ionic-angular';
import { FanCaveApp } from './../../app/app.component';

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuthServiceProviderMock, InAppBrowserMock} from '../../../test-config/mocks';
import { Storage } from '@ionic/storage'
import { StorageMock } from '../../../test-config/mocks';
import { GlobalServiceProvider } from './../../providers/global-service/global-service';
import { GlobalServiceProviderMock } from '../../../test-config/mocks';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

let component: SignupPage; 
let fixture: ComponentFixture<SignupPage>;

describe('Page: Signup Page', () => {
    
    //create test environment
    beforeEach(async(() => { //async reads external files async
        
        TestBed.configureTestingModule({ 
 
            declarations: [FanCaveApp, SignupPage], //component to test
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
				IonicModule.forRoot(FanCaveApp),
				PasswordStrengthBarModule
            ]
 
        }).compileComponents();
 
    }));
    
    //create the component instance
    beforeEach(() => {
 
        fixture = TestBed.createComponent(SignupPage); //component
        component = fixture.componentInstance; //instance
    });
  
    //invoke the test case (call provider and display data inside view)
    it('signup with good username and password', () => {
		
		//clicking the submit button will trigger call to authentication service
        var navCtrl = fixture.debugElement.injector.get(NavController);
		
		//NOTE: commented code below is unable to set form fields, so set them instead via the component variables

        //user enters username and password 
		// let firstName = fixture.debugElement.query(By.css('ion-input[formControlName=firstName]'));
		// let lastName = fixture.debugElement.query(By.css('ion-input[formControlName=lastName]'));
		// let email = fixture.debugElement.query(By.css('ion-input[formControlName=username]'));
		// let password = fixture.debugElement.query(By.css('ion-input[formControlName=password]'));
		// let password2 = fixture.debugElement.query(By.css('ion-input[formControlName=password2]'));
		
		// firstName.nativeElement.value = "Jose";
		// lastName.nativeElement.value = "Shake";
		// email.nativeElement.value = "ozair@example.com"; 
		// password.nativeElement.value = "passw0rd";
		// password2.nativeElement.value = "passw0rd";

		component.signupForm.controls.firstName.setValue("Jose"); 
		component.signupForm.controls.lastName.setValue("Shake");
		component.signupForm.controls.username.setValue("ozair@example.com");
		component.signupForm.controls.password.setValue("passw0rd");
		component.signupForm.controls.password2.setValue("passw0rd");
	
		fixture.detectChanges();

        //after successful login, user navigates to TabsPage
        spyOn(navCtrl, 'push');

        let submit = fixture.debugElement.query(By.css('button[type=submit]'));
        submit.triggerEventHandler('click', null);

		fixture.detectChanges();
		
        expect(navCtrl.push).toHaveBeenCalledWith(TabsPage, {});
    });

    //invoke the test case (call provider and display data inside view)
    it('signup with bad username and password', () => {
		
		//NOTE: commented code below is unable to set form fields, so set them instead via the component variables

        //user enters username and password 
		// let firstName = fixture.debugElement.query(By.css('ion-input[formControlName=firstName]'));
		// let lastName = fixture.debugElement.query(By.css('ion-input[formControlName=lastName]'));
		// let email = fixture.debugElement.query(By.css('ion-input[formControlName=username]'));
		// let password = fixture.debugElement.query(By.css('ion-input[formControlName=password]'));
		// let password2 = fixture.debugElement.query(By.css('ion-input[formControlName=password2]'));
		
		component.signupForm.controls.firstName.setValue("Jose"); 
		component.signupForm.controls.lastName.setValue("Shake");
		component.signupForm.controls.username.setValue("ozair@example.com");
		component.signupForm.controls.password.setValue("bad");
		component.signupForm.controls.password2.setValue("bad");
		
		fixture.detectChanges();

        let submit = fixture.debugElement.query(By.css('button[type=submit]'));
        submit.triggerEventHandler('click', null);

		fixture.detectChanges();

		let error = fixture.debugElement.query(By.css('form ion-list ion-item p'));
		
        expect(error).toBeTruthy();
    });

    //destroy the component instance
    afterEach(() => {
        fixture.destroy();
        component = null;
    });
 
});