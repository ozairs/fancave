import { FormControl } from '@angular/forms';

/**
 * class: PasswordValidator
 * 
 * helper class to validate password and provide strength indicator
 */
export class PasswordValidator {
 
    /**
     * checks if the password fields match when confirming password entries
     * @param control - form control containing password fields
     */
    static isValid(control: FormControl): any {
        
        if (control.parent){
            var password = control.parent.controls['password'].value;
            var password2 = control.parent.controls['password2'].value;

            if (password != password2 ) {
                return {
                    "no_match": true
                };
            } 
        } 
        return null;
    }

    /**
     * check password based on a set of password rules for a good password
     * @param control - form control
     */
    static passwordStrength(control: FormControl): any {
        
        if (control.parent){
            var password = control.parent.controls['password'].value;
            
            if (password.length < 8) {
                return {"bad_password": true};
            } else if (password.search(/\d/) == -1) {
                return {"bad_password": true};
            } else if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
                return {"bad_password": true};
            } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
                return {"bad_password": true};
            }
        } 
        return null;
    }
 
}