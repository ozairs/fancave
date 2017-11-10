webpackJsonp([0],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * class: ProfilePage
 *
 * displays profile page from logged in user
 */
var ProfilePage = (function () {
    /**
     * @constructor
     * @param navCtrl
     * @param navParams
     */
    function ProfilePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = navParams.data;
        if (this.user == 'undefined' || !this.user)
            console.error('Unable to find any user information');
    }
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-profile',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/profile/profile.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card *ngIf="user.name">\n    <img src="{{user.picture}}" width="128" height="128" />\n    <ion-card-content>\n      <h2 class="card-title">{{user.name}}</h2>\n    </ion-card-content>\n    <ion-list>\n      <ion-item>\n        <ion-icon item-left name="ion-email"></ion-icon>\n        <h3>Email</h3>\n        <ion-note item-right item-right>{{user.email}}</ion-note>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/profile/profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * class: TeamsProvider
 * returns a list of teams and scores for a given league
 */
var TeamsProvider = (function () {
    /**
     * @constructor
     * @param http
     */
    function TeamsProvider(http) {
        this.http = http;
        this.teams = [];
        //initialize the scores array
        this.scores = {
            "mlb": {
                "dates": {}
            },
            "nba": {
                "dates": {}
            },
            "nhl": {
                "dates": {}
            }
        };
    }
    /**
     * returns list of teams for a given league
     * @param league - name for a league
     */
    TeamsProvider.prototype.getTeams = function (league) {
        var _this = this;
        console.log("<< getTeams");
        //if data has been populated then return it, otherwise retrieve it remotely
        if (this.teams[league] != undefined) {
            console.log(">> getTeams");
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(this.teams[league]);
        }
        else {
            console.log(">> getTeams");
            return this.http.get('/api/team/list?league=' + league)
                .map(function (data) {
                return _this.teams[league] = data.json().teams.map(function (item) {
                    //build the logo url for each team
                    item['logo'] = data.json().metadata.logo + data.json().metadata.shortname + '/' + item.name.toLowerCase().split(' ').join('-') + '.svg';
                    return item;
                }).sort(function (a, b) {
                    //perform alphabetical support
                    var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0; //default return value (no sorting)  
                });
            });
        }
    };
    /**
     * obtain list of scores for a given league and date. Force refetch of scores data using the @param refresh parameter
     * @param league - name for a league
     * @param date - date for scores
     * @param refresh - flag to fetch scores data again
     */
    TeamsProvider.prototype.getScores = function (league, date, refresh) {
        var _this = this;
        console.log("<< getScores");
        //if data has been populated then return it, otherwise retrieve it remotely
        if (this.scores && this.scores[league] && this.scores[league].dates[date] && !refresh) {
            console.log(">> getScores");
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(this.scores[league].dates[date]);
        }
        else {
            console.log(">> getScores");
            return this.http.get('/api/team/scores?league=' + league + '&date=' + date)
                .map(function (data) {
                //initialize variables to allocate appropriate data structure (object vs array)
                var scoresData = {};
                scoresData[date] = [];
                //add team logo to each scores item
                var modScoresData = _this.getTeamLogo(league, data.json());
                scoresData[date] = modScoresData;
                _this.scores[league].dates = scoresData;
                return _this.scores[league].dates[date];
            });
        }
    };
    /**
     * add a logo url to each team within the @param scores parameter
     * @param league - name for league
     * @param scores - array of scores
     */
    TeamsProvider.prototype.getTeamLogo = function (league, scores) {
        var _this = this;
        console.log("<< getTeamLogo");
        //return array with modified logo urls
        return scores.map(function (score) {
            //replace spaces with dash to normalize comparison
            var awayTeam = score.away.split(' ').join('-').toLowerCase();
            var homeTeam = score.home.split(' ').join('-').toLowerCase();
            //normalize any abbreviations within the team names
            awayTeam = awayTeam.split('la-')[1] || awayTeam.split('ny-')[1] || awayTeam.split('st.-')[1] || awayTeam;
            homeTeam = homeTeam.split('la-')[1] || homeTeam.split('ny-')[1] || homeTeam.split('st.-')[1] || homeTeam;
            //find the fully qualified team name - matching against the team name in the scores param
            for (var i = 0; i < _this.teams[league].length; i++) {
                //normalize match by replacing spaces with dashes in the teams array and compare against @param scores array
                if (_this.teams[league][i].name.toLowerCase().split(' ').join('-').indexOf(awayTeam) >= 0) {
                    score['awayLogo'] = score['awayLogo'].split(score.away.toLowerCase())[0] + _this.teams[league][i].name.toLowerCase().split(' ').join('-') + '.svg';
                }
                else if (_this.teams[league][i].name.toLowerCase().split(' ').join('-').indexOf(homeTeam) >= 0) {
                    score['homeLogo'] = score['homeLogo'].split(score.home.toLowerCase())[0] + _this.teams[league][i].name.toLowerCase().split(' ').join('-') + '.svg';
                }
            }
            console.log(">> getTeamLogo");
            return score;
        });
    };
    return TeamsProvider;
}());
TeamsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], TeamsProvider);

//# sourceMappingURL=teams.js.map

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * class: ResetPage
 * allows users to reset their password using the Auth0 authentication service
 */
var ResetPage = (function () {
    /**
     * @constructor
     * @param navCtrl
     * @param formBuilder
     * @param global
     * @param authService
     */
    function ResetPage(app, navCtrl, formBuilder, global, authService) {
        this.app = app;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.global = global;
        this.authService = authService;
        this.resetPage = { submit: false, status: '' };
        //initialize form
        this.resetForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-z-_@/.A-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    /**
     * performs password reset and checks status
     */
    ResetPage.prototype.resetPassword = function () {
        console.log("<< resetPasword");
        this.resetPage.submit = true;
        this.resetPage.status = this.authService.changePassword(this.resetForm.controls.email.value);
        if (this.resetPage.status) {
            this.global.presentConfirm("Password reset request successful.");
            setTimeout(1000);
            this.app.getRootNav().push('LoginPage');
        }
        console.log(">> resetPasword");
    };
    return ResetPage;
}());
ResetPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'reset-page',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/reset/reset.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Reset Password\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div >\n    <h2>\n      <img src="assets/img/megafanz-logo-64.png" alt="logo" style=" display: block; margin-left: auto; margin-right: auto;">\n    </h2>\n  </div>\n    <p ion-text color="dark" >\n        Please enter your email address.\n    </p>\n  	<form [formGroup]="resetForm" novalidate>\n		<ion-list>\n      <ion-item *ngIf="resetForm.submitted" class="background">\n          <p ion-text color="primary" >\n            {{resetForm.status}}\n          </p>\n      </ion-item>\n			<ion-item>\n				<ion-label stacked color="primary" style="font-size: larger">Email</ion-label>\n				<ion-input formControlName="email" type="text" spellcheck="false" autocapitalize="off">\n				</ion-input>\n      </ion-item>\n      <ion-item *ngIf="!resetForm.controls.email.valid  && resetForm.controls.email.dirty" class="background">\n          <p ion-text color="danger" >\n            Email address is required.\n          </p>\n      </ion-item>\n			\n		</ion-list>\n\n		<ion-row responsive-sm>\n			<ion-col>\n				<button ion-button (click)="resetPassword()" type="submit" block [disabled]="!resetForm.valid">Reset Password</button>\n			</ion-col>\n		</ion-row>\n	</form>\n</ion-content>\n'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/reset/reset.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__["a" /* GlobalServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__["a" /* GlobalServiceProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]) === "function" && _e || Object])
], ResetPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=reset.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__password__ = __webpack_require__(768);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * class: SignupPage
 *
 * create new user account using Auth0 authentication service
 */
var SignupPage = (function () {
    /**
     * @constructor
     * @param navCtrl
     * @param formBuilder
     * @param authService
     * @param events
     */
    function SignupPage(navCtrl, formBuilder, authService, events) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.events = events;
        this.signupPage = { submit: false, error: '' };
        //initialize form with validators
        this.signupForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-z-_@/.A-Z ]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__password__["a" /* PasswordValidator */].passwordStrength])],
            password2: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_5__password__["a" /* PasswordValidator */].isValid])],
            firstName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required]
        });
    }
    /**
     * navigate to home page
     */
    SignupPage.prototype.home = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    /**
     * perform signup using information from web form
     */
    SignupPage.prototype.signup = function () {
        var _this = this;
        console.log("<< signup");
        this.signupPage.submit = true;
        //subscribe to login event since successful signup triggers automatic login
        this.events.subscribe('user:login', function (evt) {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */], {});
        });
        //subscribe to signup error event and display error message
        this.events.subscribe('user:error', function (evt) {
            console.log(evt.description);
            _this.signupPage.error = evt.description;
            _this.signupForm.controls['password'].setValue('');
        });
        //perform signup using Auth0 authentication service
        this.authService.signup(this.signupForm.controls.username.value, this.signupForm.controls.password.value, this.signupForm.controls.firstName.value, this.signupForm.controls.lastName.value);
        console.log(">> signup");
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-signup',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Signup\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div >\n    <h2>\n      <img src="assets/img/megafanz-logo-64.png" alt="logo" style=" display: block; margin-left: auto; margin-right: auto;"\n        (click)="home()">\n    </h2>\n  </div>\n  <form [formGroup]="signupForm" novalidate>\n    <ion-list>\n      <ion-item class="background" *ngIf="signupPage.error != \'\'">\n        <p ion-text color="danger" >\n          {{signupPage.error}}\n        </p>\n      </ion-item>\n\n      <ion-item>\n        <ion-label stacked color="primary" style="font-size: larger">First name</ion-label>\n        <ion-input formControlName="firstName" type="text">\n        </ion-input>\n      </ion-item>\n      <p class="background" ion-text color="danger" *ngIf="!signupForm.controls.firstName.valid  && signupForm.controls.firstName.dirty">\n        First Name is required.\n      </p>\n\n      <ion-item>\n        <ion-label stacked color="primary" style="font-size: larger">Last name</ion-label>\n        <ion-input formControlName="lastName" type="text">\n        </ion-input>\n      </ion-item>\n      <p class="background" ion-text color="danger" *ngIf="!signupForm.controls.lastName.valid  && signupForm.controls.lastName.dirty">\n        Last Name is required.\n      </p>\n\n      <ion-item>\n        <ion-label stacked color="primary" style="font-size: larger">Email</ion-label>\n        <ion-input formControlName="username" type="text" spellcheck="false" autocapitalize="off">\n        </ion-input>\n      </ion-item>\n      <p ion-text color="danger" *ngIf="!signupForm.controls.username.valid  && signupForm.controls.username.dirty">\n        Username is required.\n      </p>\n\n      <ion-item>\n        <ion-label stacked color="primary" style="font-size: larger">Password</ion-label>\n        <ion-input formControlName="password" type="password" (ionFocus)="signupPage.error = \'\';">\n        </ion-input>\n      </ion-item>\n      <p ion-text color="danger" *ngIf="signupForm.controls.password.errors && signupForm.controls.password.errors.required  && signupForm.controls.password.dirty">\n        Password is required.\n      </p>\n      <p ion-text color="danger" *ngIf="signupForm.controls.password.errors && signupForm.controls.password.errors.bad_password && signupForm.controls.password.dirty && !signupForm.controls.password.errors.required">\n        Password not strong enough.\n      </p>\n      <ion-item>\n        <ion-label stacked color="primary" style="font-size: larger">Confirm Password</ion-label>\n        <ion-input formControlName="password2" type="password">\n        </ion-input>\n      </ion-item>\n      <p ion-text color="danger" *ngIf="!signupForm.controls.password2.valid && signupForm.controls.password.dirty && signupForm.controls.password2.dirty">\n        Passwords do not match.\n      </p>\n      <ion-item >\n        <ng2-password-strength-bar [passwordToCheck]="signupForm.controls.password.value" [barLabel]="\'Password strength:\'">\n        </ng2-password-strength-bar>\n      </ion-item>\n\n    </ion-list>\n\n    <ion-row responsive-sm>\n      <ion-col>\n        <button color="primary" type="submit" ion-button (click)="signup()" [disabled]="!signupForm.valid" block>Create</button>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/signup/signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 204:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 204;

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Class: PopoverPage
 *
 * creates a popup page that dynamically displays menu based on whether the user is logged in
 *
 */
var PopoverPage = (function () {
    /**
     *
     * @constructor
     * @param app
     * @param authService
     */
    function PopoverPage(app, authService, viewCtrl, navParams) {
        this.app = app;
        this.authService = authService;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        console.log(">> PopoverPage");
        this.isLogin = navParams.get('data');
    }
    /**
     * perform logout and transitions to login page
     */
    PopoverPage.prototype.logout = function () {
        console.log("<< logout");
        this.viewCtrl.dismiss();
        //trigger logout
        this.authService.logout();
        console.log(">> logout");
    };
    /**
     * performs login and transitions to login page
     */
    PopoverPage.prototype.login = function () {
        console.log("<< login");
        this.viewCtrl.dismiss();
        this.app.getRootNav().push('LoginPage');
        console.log(">> login");
    };
    /**
     * displays profile page
     *
     */
    PopoverPage.prototype.profile = function () {
        var _this = this;
        console.log("<< profile");
        this.viewCtrl.dismiss();
        this.authService.getSession().then(function (user) {
            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */], user);
        });
        console.log(">> profile");
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n\t<ion-list *ngIf=\"this.isLogin\">\n\t  <button ion-item (click)=\"profile()\">Profile</button>\n    <button ion-item (click)=\"logout()\">Logout</button>\n  </ion-list>\n  <ion-list *ngIf=\"!this.isLogin\">\n    <button ion-item (click)=\"login()\">Login</button>\n  </ion-list>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
], PopoverPage);

//# sourceMappingURL=about-popover.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_players_players__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(402);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * class: PlayersPage
 *
 * returns the top players from a given league
 */
var PlayersPage = (function () {
    /**
     * @constructor
     * @param navCtrl
     * @param modalCtrl
     * @param inAppBrowser
     * @param playersData
     * @param geolocation
     * @param loadingCtrl
     * @param popoverCtrl
     */
    function PlayersPage(navCtrl, modalCtrl, inAppBrowser, playersData, geolocation, loadingCtrl, popoverCtrl, global) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.inAppBrowser = inAppBrowser;
        this.playersData = playersData;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.global = global;
        this.queryText = '';
        this.players = [];
        this.segment = 'nhl';
    }
    /**
     * retrieve list of players when page loads
     */
    PlayersPage.prototype.ionViewDidLoad = function () {
        console.log("<< ionViewDidLoad");
        this.updatePlayers();
        console.log(">> ionViewDidLoad");
    };
    /**
     * retrieve list of players when page loads
     * @param button - currently selected league
     */
    PlayersPage.prototype.onSegmentChange = function (button) {
        console.log(">> onSegmentChange");
        this.queryText = ''; //track the current search filter
        this.segment = button;
        this.updatePlayers();
        console.log("<< onSegmentChange");
    };
    /**
     * retrieve updated list of players based on search filter
     */
    PlayersPage.prototype.updatePlayers = function () {
        var _this = this;
        console.log('<< updatePlayers()');
        this.global.presentLoading();
        //get players list based on search filter and league
        this.playersData.getFilteredPlayers(this.segment, this.queryText.toLowerCase()).subscribe(function (players) {
            _this.global.closeLoading();
            //if no players return based on filter, manually set array length to clear
            if (players.length == 0) {
                _this.players.length = 0;
            }
            else {
                _this.players = players;
            }
        });
        console.log('>> updatePlayers()');
    };
    return PlayersPage;
}());
PlayersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-players',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/players/players.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Players</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="global.presentPopover($event)">\n        <ion-icon name="contact" isActive="true"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  \n    <ion-grid class="button-group">\n      <ion-row>\n        <ion-col>\n          <button ion-button icon-start block color="primary" [outline]="this.segment != \'nhl\'" (click)="this.onSegmentChange(\'nhl\');">\n            <ion-icon name="icon-ci-hockey"></ion-icon>\n            NHL\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start block [outline]="this.segment != \'nba\'" (click)="this.onSegmentChange(\'nba\');">\n            <ion-icon name=\'basketball\' is-active="false"></ion-icon>\n            NBA\n          </button>\n        </ion-col>\n        <ion-col>\n            <button ion-button icon-start block [outline]="this.segment != \'mlb\'" (click)="this.onSegmentChange(\'mlb\');">\n              <ion-icon name=\'baseball\' is-active="false"></ion-icon>\n              MLB\n            </button>\n          </ion-col>\n      </ion-row>\n    </ion-grid>\n  <!-- searchbar -->\n  <ion-toolbar no-border-top>\n    <ion-searchbar color="primary" [(ngModel)]="queryText" (ionInput)="updatePlayers()" placeholder="Search">\n    </ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="outer-content">\n  <!--\n    virtualScroll would not display list until resized so removed it\n    [virtualScroll]="players" *virtualItem="let player" approxItemHeight="457px" \n    see https://stackoverflow.com/questions/43738085/ionic-2-virtual-scrolling-not-working-as-expected\n    -->\n  <ion-list>\n    <ion-grid>\n      <ion-row align-items-stretch>\n        <ion-col align-self-stretch align-self-center>\n          <ion-card color="light" *ngFor="let player of players" class="player-card">\n            <ion-card-header>\n              <button color="dark" style="padding: 0 !important; " ion-item detail-none>\n                <ion-avatar item-start>\n                  <img [src]="player.picture"/>\n                </ion-avatar>\n                <ion-label style="font-weight: bolder;">\n                   {{player.name}}\n                </ion-label>\n                \n              </button>\n            </ion-card-header>\n\n            <ion-card-content class="outer-content" >\n              <ion-list >\n                <ion-item color="light">\n                  <ion-avatar item-start>\n                    <img [src]="player.logo" width="128" height="128" />\n                  </ion-avatar>\n                  <ion-label>\n                    <h2>{{player.team}}</h2>\n                  </ion-label>\n                </ion-item>\n                <ion-item color="light">\n                  <ion-label>\n                    <h2>&nbsp;&nbsp;<ion-icon name="body"></ion-icon>\n                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position: {{player.position}}</h2>\n                  </ion-label>\n              </ion-item>\n              <ion-item color="light">\n                  <!-- Searching Yahoo news instead of en.wikipedia.org/wiki/ -->\n                  <button style="padding: 0;" ion-button clear small color="primary" icon-start (click)="global.openLink(\'https://ca.search.yahoo.com/yhs/search?p=\' + player.name)">\n                      &nbsp;&nbsp;<ion-icon name="person"></ion-icon>\n                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;News\n                    </button>\n              </ion-item>\n                <ion-item color="light">\n                    <button style="padding: 0;" ion-button clear small color="primary" icon-start (click)="global.openLink(\'https://twitter.com/search?q=\'+ player.name)">\n                        &nbsp;&nbsp;<ion-icon name="logo-twitter"></ion-icon>\n                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tweets\n                      </button>\n                </ion-item>\n              </ion-list>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/players/players.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_4__providers_players_players__["a" /* PlayersProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
], PlayersPage);

//# sourceMappingURL=players.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geocoding_service_geocoding_service__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_from__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * class: PlayersProvider
 *
 * returns a list of players for a given league
 */
var PlayersProvider = (function () {
    // mapData: Array<any>;
    /**
     *
     * @param http - request module
     * @param geocode - obtain geocoordinate based on location information
     */
    function PlayersProvider(http, geocode) {
        this.http = http;
        this.geocode = geocode;
        this.data = [];
    }
    /**
     * retreives a set of players for a requested league
     * @param league - name of league
     */
    PlayersProvider.prototype.getPlayers = function (league) {
        var _this = this;
        console.log("<< getPlayers");
        //if data has been populated then return it, otherwise retrieve it remotely
        if (this.data[league] != undefined) {
            console.log(">> getPlayers");
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].of(this.data[league]);
        }
        else {
            //return list of players
            console.log(">> getPlayers");
            return this.http.get('/api/player/list?league=' + league)
                .map(function (data) { return _this.data[league] = data.json().sort(function (a, b) {
                //sort the list of players in alphabetical order
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)  
            }); });
        }
    };
    /**
     * return the list of players for the requested league based on a filter that matches the players
     * @param league - requested league name
     * @param filter - string that contains matching criterial to return list of players
     */
    PlayersProvider.prototype.getFilteredPlayers = function (league, filter) {
        console.log("<< getFilteredPlayers");
        return this.getPlayers(league)
            .concatMap(function (arr) { return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].from(arr); })
            .filter(function (p) {
            console.log(">> getFilteredPlayers");
            return p.name.toLowerCase().indexOf(filter) >= 0 || p.team.toLowerCase().indexOf(filter) >= 0;
        }).toArray();
    };
    return PlayersProvider;
}());
PlayersProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__geocoding_service_geocoding_service__["a" /* GeocodingServiceProvider */]])
], PlayersProvider);

//# sourceMappingURL=players.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeocodingServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the GeocodingServiceProvider provider.

  https://github.com/robisim74/angular-maps/blob/master/app/services/geocoding.service.ts
*/
var GeocodingServiceProvider = (function () {
    function GeocodingServiceProvider(http) {
        this.http = http;
        this.mapData = [];
        this.maxData = 0;
        console.log('Hello GeocodingServiceProvider Provider');
    }
    /**
       * Geocoding services.
       *
       * Wraps the Google Maps API geocoding service into an observable.
       *
       * @param address The address to be searched
       * @return An observable of GeocoderResult
       * Observable<any[]>
       */
    GeocodingServiceProvider.prototype.codeAddress = function (players) {
        var _this = this;
        this.maxData = players.array.length;
        this.geocoder = new google.maps.Geocoder();
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            // console.log(">> codeAddress");
            // Invokes geocode method of Google Maps API geocoding.
            players.forEach(function (player, index) {
                _this.geocoder.geocode({ 'address': player.birthplace }, (function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        // console.log("google geocode results %s", JSON.stringify(results));
                        var playerData = {};
                        playerData['id'] = player.id + '';
                        playerData['location'] = results[0].geometry.location;
                        console.log('pushing player id with geo data %s', JSON.stringify(playerData));
                        _this.mapData.push(playerData);
                        //check if its the last element in the array
                        if (_this.mapData.length == _this.maxData) {
                            // console.log("google geocode array %s", JSON.stringify(this.mapData));
                            observer.next(_this.mapData);
                            observer.complete();
                        }
                    }
                    else {
                        console.log('Geocoding service: geocode was not successful for the following reason: ' + status);
                        observer.error(status);
                    }
                }));
            }); //players.forEach
        });
    };
    return GeocodingServiceProvider;
}());
GeocodingServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], GeocodingServiceProvider);

//# sourceMappingURL=geocoding-service.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_teams_teams__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scores_scores__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_timezone__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment_timezone__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * class: TeamsPage
 *
 * returns a set of professional sports teams for a given league, and select scores for a specific team
 */
var TeamsPage = (function () {
    /**
     * @constructor
     * @param navCtrl
     * @param modalCtrl
     * @param teamsProvider
     * @param loadingCtrl
     * @param popoverCtrl
     * @param inAppBrowser
     */
    function TeamsPage(navCtrl, modalCtrl, teamsProvider, global) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.teamsProvider = teamsProvider;
        this.global = global;
        this.markers = [];
        //track list vs map view
        this.list_segment = true;
        this.segment = 'nhl';
        this.today = __WEBPACK_IMPORTED_MODULE_5_moment_timezone___default()().tz('America/Toronto').format('YYYY-MM-DD');
    }
    /**
     * when page loads, retrieve list of teams for a given league
     */
    TeamsPage.prototype.ionViewDidLoad = function () {
        console.log("<< ionViewDidLoad");
        this.updateTeams();
        console.log(">> ionViewDidLoad");
    };
    /**
     * retrieve list of teams when user selects a league
     * @param button - current league
     */
    TeamsPage.prototype.onSegmentChange = function (button) {
        console.log("<< onSegmentChange");
        this.segment = button;
        this.updateTeams();
        console.log(">> onSegmentChange");
    };
    /**
     * switches between the map and the list view
     */
    TeamsPage.prototype.onViewChange = function () {
        console.log("<< onViewChange");
        if (this.list_segment) {
            this.updateTeams();
        }
        else {
            this.updateMap();
        }
        console.log(">> onViewChange");
    };
    /**
     * obtain the list of teams from the backend datasource
     */
    TeamsPage.prototype.updateTeams = function () {
        var _this = this;
        console.log("<< updateTeams");
        this.global.presentLoading();
        //call teams service
        this.teamsProvider.getTeams(this.segment).subscribe(function (teams) {
            _this.teams = teams;
            //current view is map
            if (!_this.list_segment) {
                _this.updateMap();
            }
            _this.global.closeLoading();
        });
        console.log(">> updateTeams");
    };
    /**
     * opens google map with location pins to sports teams for the selected league
     */
    TeamsPage.prototype.updateMap = function () {
        var _this = this;
        console.log("<< updateMap");
        //no teams available
        if (this.teams.length < 0)
            return;
        //map is already initialized so remove markers (will refresh markers later)
        if (this.mapDOM) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = [];
        }
        else {
            this.mapDOM = this.mapElement.nativeElement;
            this.map = new google.maps.Map(this.mapDOM, {
                center: new google.maps.LatLng(41.850033, -87.6500523),
                zoom: 4
            });
        }
        //iterate over the teams array and create a marker
        this.teams.forEach(function (team, index) {
            //create map marker for each team with additional metadata
            var marker = new google.maps.Marker({
                position: { lat: team.lat, lng: team.long },
                map: _this.map,
                title: team.name,
                animation: google.maps.Animation.DROP,
            });
            //create the team card for the pin when selected
            var content = "<div id=\"content\">" +
                "<div id=\"siteNotice\">" +
                "</div>" +
                ("<h1 id=\"firstHeading\" class=\"firstHeading\">" + team.name + "</h1>") +
                ("<h4 id=\"secondHeading\" class=\"secondHeading\">" + team.city + "</h4>") +
                ("<p id=\"thirdHeading\" class=\"thirdHeading\"><b>" + team.arena + "</b></p>") +
                "<div id=\"bodyContent\">" + ("<div style=\"float:center; width:100%;\"><img src=\"" + team.arena_img + "\" width=\"120\" height=\"80\"/></div>") +
                "</div>" +
                "</div>";
            //create the info window for google maps
            var infoWindow = new google.maps.InfoWindow({ content: content });
            //attach the info window to the market when selected
            marker.addListener('click', function () {
                infoWindow.open(_this.map, marker);
            });
            //add marker to markers array - track the markers seperately so we can remove them when 
            //viewing a map where the pins change because a different league is selected
            _this.markers.push(marker);
            //fix needed to display google maps correctly after initial initialization
            google.maps.event.addListenerOnce(_this.map, 'idle', function () {
                _this.mapDOM.classList.add('show-map');
            });
        });
        console.log(">> updateMap");
    };
    /**
     * helper function to generate an header based on the first character of a team such that all teams
     * with that start with the same character are grouped together
     * @param record - current team
     * @param recordIndex - current index in team array
     */
    TeamsPage.prototype.customHeader = function (record, recordIndex) {
        if (recordIndex > 0) {
            //create new header
            if (record.name.charAt(0) !== this.teams[recordIndex - 1].name.charAt(0)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    /**
     * creates a modal to display scores for a selected team
     * @param league - selected league name
     * @param team - selected team name
     * @param date - selected data
     */
    TeamsPage.prototype.getScores = function (league, team, date) {
        console.log("<< getScores");
        var scoresModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__scores_scores__["a" /* ScoresPage */], { league: league, team: team, date: date });
        scoresModal.present();
        console.log(">> getScores");
    };
    return TeamsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"])('mapCanvas'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__angular_core__["ElementRef"])
], TeamsPage.prototype, "mapElement", void 0);
TeamsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'page-teams',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/teams/teams.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Teams\n    </ion-title>\n    <ion-buttons end>\n        <button ion-button icon-only (click)="global.presentPopover($event)">\n          <ion-icon name="contact" isActive="true"></ion-icon>\n        </button>\n      </ion-buttons>\n  </ion-navbar>\n  <ion-grid class="button-group" sticky>\n      <ion-row>\n        <ion-col>\n          <button ion-button icon-start block color="primary" [outline]="this.segment != \'nhl\'" (click)="this.onSegmentChange(\'nhl\');">\n              <ion-icon name="icon-ci-hockey"></ion-icon>\n              NHL\n            </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start block [outline]="this.segment != \'nba\'" (click)="this.onSegmentChange(\'nba\');">\n              <ion-icon name=\'basketball\' is-active="false"></ion-icon>\n              NBA\n            </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start block [outline]="this.segment != \'mlb\'" (click)="this.onSegmentChange(\'mlb\');">\n                <ion-icon name=\'baseball\' is-active="false"></ion-icon>\n                MLB\n              </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n</ion-header>\n\n<ion-content [hidden]="!list_segment">\n  <ion-list>\n    <ion-item-group *ngFor="let team of teams; let curIndex = index">\n      <ion-item-divider *ngIf="customHeader(team, curIndex)" color="dark" sticky>\n        <h2>{{team.name.charAt(0)}}</h2>\n      </ion-item-divider>\n      <ion-card color="light">\n        <ion-card-content style="padding: 0;">\n          <ion-list no-lines>\n            <ion-item detail-push color="light">\n              <ion-thumbnail item-left>\n                <img [src]="team.logo" height="64" height="64">\n              </ion-thumbnail>\n              <h2>{{team.name}}</h2>\n              <p style="font-size: smaller">{{team.city}}</p>\n              <button style="padding: 0;" ion-button clear small color="primary" icon-start (click)="global.openLink(team.homepage)">\n                  <ion-icon name="home"></ion-icon>\n                  &nbsp;&nbsp;Home Page\n              </button>\n              <br/>\n              <button style="padding: 0;" ion-button clear color="primary" icon-start (click)="getScores( this.segment, team.name, this.today )">\n                <ion-icon *ngIf="this.segment == \'mlb\'" name="baseball"></ion-icon>\n                <ion-icon *ngIf="this.segment == \'nhl\'" name="icon-ci-hockey"></ion-icon>\n                <ion-icon *ngIf="this.segment == \'nba\'" name="basketball"></ion-icon>&nbsp;&nbsp;Scores\n              </button>\n            </ion-item>\n          </ion-list>\n        </ion-card-content>\n      </ion-card>\n    </ion-item-group>\n  </ion-list>\n</ion-content>\n\n\n<ion-content class="map-page" [hidden]="list_segment">\n    <div style="height: 100%; width: 100%" #mapCanvas id="map_canvas"></div>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar border-top border-bottom>\n    <ion-grid class="button-group">\n      <ion-row>\n        <ion-col>\n          <button ion-button icon-start block color="primary" [outline]="!list_segment" (click)="this.list_segment = !this.list_segment; this.onViewChange();">\n            <ion-icon name=\'list\'></ion-icon>\n            List\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start block [outline]="list_segment" (click)="this.list_segment = !this.list_segment; this.onViewChange();">\n            <ion-icon name=\'map\' is-active="false"></ion-icon>\n            Map\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/teams/teams.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1__providers_teams_teams__["a" /* TeamsProvider */], __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
], TeamsPage);

//# sourceMappingURL=teams.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_news_news__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Class: HomePage
 *
 * This class retrieves a set of news articles based on the selected league
 */
var NewsPage = (function () {
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
    function NewsPage(navCtrl, storage, popoverCtrl, feedsService, loadingCtrl, global) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.popoverCtrl = popoverCtrl;
        this.feedsService = feedsService;
        this.loadingCtrl = loadingCtrl;
        this.global = global;
        this.segment = 'nhl';
    }
    /**
     * obtain the news upon loading the page
     */
    NewsPage.prototype.ionViewDidLoad = function () {
        this.getNews();
    };
    /**
     * set of buttons to track the currently selected league
     * @param button - current selected league
     */
    NewsPage.prototype.onSegmentChange = function (button) {
        console.log("<< onSegmentChange");
        this.segment = button;
        this.getNews();
        console.log(">> onSegmentChange");
    };
    /**
     * retrieves a set of news articles for a league
     */
    NewsPage.prototype.getNews = function () {
        var _this = this;
        console.log("<< getNews");
        this.global.presentLoading();
        //trigger call to obtain news for currently selected league
        this.feedsService.getNews(this.segment, false).subscribe(function (data) {
            _this.global.closeLoading();
            _this.articles = data;
        });
        console.log(">> getNews");
    };
    /**
     * fetch the latest news article (second flag 'true') even if content is available
     * @param refresher - ui refresh (spinner) component
     */
    NewsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log("<< doRefresh");
        //refetch the latest news articles
        this.feedsService.getNews(this.segment, true).subscribe(function (data) {
            refresher.complete();
            _this.articles = data;
        });
        console.log(">> doRefresh");
    };
    return NewsPage;
}());
NewsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'page-news',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/news/news.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>News</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="global.presentPopover($event)">\n        <ion-icon name="contact" isActive="true"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-grid class="button-group" sticky>\n      <ion-row>\n        <ion-col>\n          <button ion-button icon-start block color="primary" [outline]="this.segment != \'nhl\'" (click)="this.onSegmentChange(\'nhl\');">\n              <ion-icon name="icon-ci-hockey"></ion-icon>\n              NHL\n            </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start block [outline]="this.segment != \'nba\'" (click)="this.onSegmentChange(\'nba\');">\n              <ion-icon name=\'basketball\' is-active="false"></ion-icon>\n              NBA\n            </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start block [outline]="this.segment != \'mlb\'" (click)="this.onSegmentChange(\'mlb\');">\n                <ion-icon name=\'baseball\' is-active="false"></ion-icon>\n                MLB\n              </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n</ion-header>\n\n<ion-content padding>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-card *ngFor="let article of articles" (click)="global.openLink(article.url)" color="light">\n    <ion-item class="item-text-wrap" color="dark">\n      <h2 class="wrap" style="color: white; font-weight: bolder">{{article.title}}</h2>\n    </ion-item>\n    <img src="{{article.urlToImage}}">\n    <ion-card-content>\n      <p [innerHTML]="article.description" color="light">\n      </p>\n      <br/>\n      <div class="date" color="light">{{article.publishedAt | date}}</div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/news/news.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1__providers_news_news__["a" /* NewsProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
], NewsPage);

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * class: NewsProvider
 * retrieves a set of news articles from an API source based on the requested league
 *
 */
var NewsProvider = (function () {
    /**
     * @constructor
     * @param http
     */
    function NewsProvider(http) {
        this.http = http;
        this.articles = [];
    }
    /**
     * retrieves a set of news articles for the requested league and stores it in a local variable.
     * news articles are refreshed if the refresh parameter is true
     * @param league - league name to filter articles
     * @param refresh - force a refetch for new articles
     */
    NewsProvider.prototype.getNews = function (league, refresh) {
        var _this = this;
        console.log("<< getNews()");
        //return data, if its already populated
        if (this.articles[league] != undefined && !refresh) {
            console.log(">> getNews()");
            return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(this.articles[league]);
        }
        else {
            return this.http.get('/api/news/feed?league=' + league).map(function (response) {
                _this.articles[league] = response.json();
                console.log(">> getNews()");
                return _this.articles[league];
            });
        }
    };
    return NewsProvider;
}());
NewsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], NewsProvider);

//# sourceMappingURL=news.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__reset_reset__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signup_signup__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * class: LoginPage
 *
 * provides login and signup capabilities for the application
 */
var LoginPage = (function () {
    /**
     * @constructor
     * @param navCtrl
     * @param formBuilder
     * @param authService
     * @param events
     * @param storage
     * @param inAppBrowser
     */
    function LoginPage(navCtrl, formBuilder, authService, events, storage, inAppBrowser) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.events = events;
        this.storage = storage;
        this.inAppBrowser = inAppBrowser;
        this.loginPage = { submit: false, error: '' }; //track login page status
        //initialize the login form control
        this.loginForm = formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].pattern('[a-z-_@/.A-Z ]*'), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* Validators */].required],
            rememberMe: []
        });
    }
    /**
     * load the login page if the user has not logged in, otherwise transition to the home page
     */
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("<< ionViewDidLoad");
        //check local storage for user session
        this.storage.get('user').then(function (session) {
            // note: session.rememberMe cannot be set for social login 
            //check if user object exists in local session and transition them to login page
            if (session && session.user && new Date().getTime() < session.expiry) {
                console.log('user %s has already logged in.', session.user.name);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
            }
        });
        console.log(">> ionViewDidLoad");
    };
    /**
     * transition to the reset password page
     */
    LoginPage.prototype.resetPassword = function () {
        console.log("<< resetPassword");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__reset_reset__["a" /* ResetPage */]);
        console.log(">> resetPassword");
    };
    /**
     * transition to the signup page
     */
    LoginPage.prototype.signup = function () {
        console.log("<< signup");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__signup_signup__["a" /* SignupPage */]);
        console.log(">> signup");
    };
    /**
     * transition to the google login page
     */
    LoginPage.prototype.googleLogin = function () {
        console.log("<< googleLogin()");
        this.authService.socialLogin();
        console.log(">> googleLogin()");
    };
    /**
     * trigger login to authentication service and transition to home page upon success
     */
    LoginPage.prototype.login = function () {
        var _this = this;
        console.log("<< login");
        this.loginPage.submit = true;
        // this.loginForm.controls.username.value, this.loginForm.controls.password.value;
        //subscribe to login success and failure events
        //user login successful
        this.events.subscribe('user:login', function (evt) {
            //add rememberMe toggle value to the session
            _this.storage.get('user').then(function (session) {
                session.rememberMe = _this.loginForm.controls['rememberMe'].value;
                _this.storage.set('user', session);
            });
            //console.log(evt);
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */], {});
        });
        //user login failure
        this.events.subscribe('user:error', function (evt) {
            _this.loginPage.error = evt.description;
            _this.loginForm.controls['password'].setValue('');
        });
        //call login service with username and password entered in the form
        this.authService.
            login(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
        console.log(">> login");
    };
    /**
     * navigate to home page
     */
    LoginPage.prototype.home = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* IonicPage */])({
        segment: 'login'
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/login/login.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title style="text-align: center">\n      Mega Fanz\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="background">\n  \n  <div >\n    <h2>\n      <img src="assets/img/megafanz-logo-64.png" alt="logo" style=" display: block; margin-left: auto; margin-right: auto;"\n        (click)="home()">\n    </h2>\n  </div>\n  <form [formGroup]="loginForm" novalidate>\n    <ion-list >\n      <ion-item class="background" *ngIf="loginPage.error != \'\'">\n        <p ion-text color="danger">\n          {{loginPage.error}}\n        </p>\n      </ion-item>\n      <ion-item>\n        <ion-label floating color="primary">Username</ion-label>\n        <ion-input formControlName="username" type="text" spellcheck="false" autocapitalize="off">\n        </ion-input>\n      </ion-item>\n      <ion-item class="background" *ngIf="!loginForm.controls.username.valid  && loginForm.controls.username.dirty">\n        <p ion-text color="danger" >\n          Username is required.\n        </p>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating color="primary">Password</ion-label>\n        <ion-input formControlName="password" type="password" (ionFocus)="loginPage.error = \'\';">\n        </ion-input>\n      </ion-item>\n      <p ion-text color="danger" *ngIf="!loginForm.controls.password.valid  && loginForm.controls.password.dirty">\n        Password is required.\n      </p>\n    </ion-list>\n\n    <ion-row responsive-sm>\n      <ion-col col-auto></ion-col>\n      <ion-col>\n        <button ion-button (click)="login()" type="submit" block [disabled]="!loginForm.valid">Login</button>\n      </ion-col>\n      <ion-col>\n        <button ion-button block color="danger" (click)="googleLogin()">\n          <ion-icon name="logo-googleplus"></ion-icon>\n          Login with Google\n        </button>\n      </ion-col>\n      <ion-col col-auto></ion-col>\n    </ion-row>\n    <ion-row responsive-sm>\n      <ion-col>\n          <ion-label style="text-decoration: none;"><a (click)="resetPassword()">&nbsp;&nbsp;&nbsp;Forgot Password</a></ion-label>\n      </ion-col>\n      <ion-col></ion-col>\n      <ion-col>\n        <ion-label style="text-decoration: none;">Don\'t have an account? <a (click)="signup()">Signup</a></ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-list radio-group>\n          <ion-item class="background">\n            <ion-label style="text-decoration: none;">Remember Me</ion-label>\n            <ion-toggle formControlName="rememberMe">Something</ion-toggle>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>\n\n<!--\n<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>\n-->'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthServiceProvider */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_in_app_browser__["a" /* InAppBrowser */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(413);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_scores_scores__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about_popover__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_teams_teams__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_players_players__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_news_news__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_profile_profile__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_reset_reset__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_storage__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_browser__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_password_strength_bar__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ng2_password_strength_bar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20_ng2_password_strength_bar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_players_players__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_geocoding_service_geocoding_service__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_news_news__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_teams_teams__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_global_service_global_service__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MegaFanzApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_players_players__["a" /* PlayersPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_teams_teams__["a" /* TeamsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_news_news__["a" /* NewsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_reset_reset__["a" /* ResetPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_scores_scores__["a" /* ScoresPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_about_about_popover__["a" /* PopoverPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_20_ng2_password_strength_bar__["PasswordStrengthBarModule"],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MegaFanzApp */], {}, {
                links: [
                    { component: __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */], name: 'TabsPage', segment: 'tabs' },
                    { component: __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */], name: 'LoginPage', segment: 'login' },
                    { component: __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */], name: 'SignupPage', segment: 'signup' },
                    { component: __WEBPACK_IMPORTED_MODULE_14__pages_reset_reset__["a" /* ResetPage */], name: 'ResetPage', segment: 'reset' }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_18__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MegaFanzApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_players_players__["a" /* PlayersPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_teams_teams__["a" /* TeamsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_news_news__["a" /* NewsPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_reset_reset__["a" /* ResetPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_scores_scores__["a" /* ScoresPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_about_about_popover__["a" /* PopoverPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_17__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_21__providers_players_players__["a" /* PlayersProvider */],
            __WEBPACK_IMPORTED_MODULE_22__providers_geocoding_service_geocoding_service__["a" /* GeocodingServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_24__providers_news_news__["a" /* NewsProvider */],
            __WEBPACK_IMPORTED_MODULE_25__providers_teams_teams__["a" /* TeamsProvider */],
            __WEBPACK_IMPORTED_MODULE_26__providers_global_service_global_service__["a" /* GlobalServiceProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_about_about_popover__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * set of global functions shared across components
 */
var GlobalServiceProvider = (function () {
    /**
     * @constructor
     * @param http
     * @param alertCtrl
     * @param popoverCtrl
     * @param loadingCtrl
     * @param inAppBrowser
     */
    function GlobalServiceProvider(http, alertCtrl, popoverCtrl, loadingCtrl, inAppBrowser) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.inAppBrowser = inAppBrowser;
        this.login = false;
    }
    /**
     * opens a loading dialog
     */
    GlobalServiceProvider.prototype.presentLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'loading...'
        });
        this.loading.present();
    };
    /**
     * closes a loading dialog
     */
    GlobalServiceProvider.prototype.closeLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
    };
    /**
     * opens a menu dialog
     */
    GlobalServiceProvider.prototype.presentPopover = function (event) {
        this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_about_about_popover__["a" /* PopoverPage */], { data: this.login });
        this.popover.present({ ev: event });
    };
    /**
     * closes a menu dialog
     */
    GlobalServiceProvider.prototype.closePopover = function () {
        if (this.popover) {
            this.popover.dismiss();
        }
    };
    /**
     * opens a confirmation dialog with buttons
     * @param message - message for the dialog
     */
    GlobalServiceProvider.prototype.presentConfirm = function (message) {
        var alert = this.alertCtrl.create({
            title: 'Confirm',
            message: message,
            buttons: [
                {
                    text: 'Confirm',
                    role: 'confirm',
                    handler: function () {
                        setTimeout(1000);
                    }
                }
                // add more buttons via json
            ]
        });
        alert.present();
    };
    /**
     * opens a link to the built-in Web browser
     * @param url - url to open
     */
    GlobalServiceProvider.prototype.openLink = function (url) {
        this.inAppBrowser.create(url, '_blank');
    };
    /**
     * set the current login status in a synchronous manner avoiding the use of promises
     * @param status
     */
    GlobalServiceProvider.prototype.setLogin = function (status) {
        return this.login = status;
    };
    /**
     * get the current login status in a synchronous manner avoiding the use of promises
     * @param status
     */
    GlobalServiceProvider.prototype.getLogin = function () {
        return this.login;
    };
    return GlobalServiceProvider;
}());
GlobalServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* PopoverController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _e || Object])
], GlobalServiceProvider);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=global-service.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AUTH_CONFIG; });
var AUTH_CONFIG = {
    domain: 'ozairs.auth0.com',
    clientID: 'r6n0rutGmBlabRmu3seS7oeXpc8HG6Mh',
    database: {
        realm: 'Username-Password-Authentication',
        audience: 'https://www.superfanz.ca/',
        scope: 'openid',
    },
    social: {
        connection: 'google-oauth2',
        responseType: 'id_token token',
        redirectUri: 'https://megafanz.mybluemix.net/index.html#/login'
    }
};
//# sourceMappingURL=global-params.js.map

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 259,
	"./af.js": 259,
	"./ar": 260,
	"./ar-dz": 261,
	"./ar-dz.js": 261,
	"./ar-kw": 262,
	"./ar-kw.js": 262,
	"./ar-ly": 263,
	"./ar-ly.js": 263,
	"./ar-ma": 264,
	"./ar-ma.js": 264,
	"./ar-sa": 265,
	"./ar-sa.js": 265,
	"./ar-tn": 266,
	"./ar-tn.js": 266,
	"./ar.js": 260,
	"./az": 267,
	"./az.js": 267,
	"./be": 268,
	"./be.js": 268,
	"./bg": 269,
	"./bg.js": 269,
	"./bn": 270,
	"./bn.js": 270,
	"./bo": 271,
	"./bo.js": 271,
	"./br": 272,
	"./br.js": 272,
	"./bs": 273,
	"./bs.js": 273,
	"./ca": 274,
	"./ca.js": 274,
	"./cs": 275,
	"./cs.js": 275,
	"./cv": 276,
	"./cv.js": 276,
	"./cy": 277,
	"./cy.js": 277,
	"./da": 278,
	"./da.js": 278,
	"./de": 279,
	"./de-at": 280,
	"./de-at.js": 280,
	"./de-ch": 281,
	"./de-ch.js": 281,
	"./de.js": 279,
	"./dv": 282,
	"./dv.js": 282,
	"./el": 283,
	"./el.js": 283,
	"./en-au": 284,
	"./en-au.js": 284,
	"./en-ca": 285,
	"./en-ca.js": 285,
	"./en-gb": 286,
	"./en-gb.js": 286,
	"./en-ie": 287,
	"./en-ie.js": 287,
	"./en-nz": 288,
	"./en-nz.js": 288,
	"./eo": 289,
	"./eo.js": 289,
	"./es": 290,
	"./es-do": 291,
	"./es-do.js": 291,
	"./es.js": 290,
	"./et": 292,
	"./et.js": 292,
	"./eu": 293,
	"./eu.js": 293,
	"./fa": 294,
	"./fa.js": 294,
	"./fi": 295,
	"./fi.js": 295,
	"./fo": 296,
	"./fo.js": 296,
	"./fr": 297,
	"./fr-ca": 298,
	"./fr-ca.js": 298,
	"./fr-ch": 299,
	"./fr-ch.js": 299,
	"./fr.js": 297,
	"./fy": 300,
	"./fy.js": 300,
	"./gd": 301,
	"./gd.js": 301,
	"./gl": 302,
	"./gl.js": 302,
	"./gom-latn": 303,
	"./gom-latn.js": 303,
	"./he": 304,
	"./he.js": 304,
	"./hi": 305,
	"./hi.js": 305,
	"./hr": 306,
	"./hr.js": 306,
	"./hu": 307,
	"./hu.js": 307,
	"./hy-am": 308,
	"./hy-am.js": 308,
	"./id": 309,
	"./id.js": 309,
	"./is": 310,
	"./is.js": 310,
	"./it": 311,
	"./it.js": 311,
	"./ja": 312,
	"./ja.js": 312,
	"./jv": 313,
	"./jv.js": 313,
	"./ka": 314,
	"./ka.js": 314,
	"./kk": 315,
	"./kk.js": 315,
	"./km": 316,
	"./km.js": 316,
	"./kn": 317,
	"./kn.js": 317,
	"./ko": 318,
	"./ko.js": 318,
	"./ky": 319,
	"./ky.js": 319,
	"./lb": 320,
	"./lb.js": 320,
	"./lo": 321,
	"./lo.js": 321,
	"./lt": 322,
	"./lt.js": 322,
	"./lv": 323,
	"./lv.js": 323,
	"./me": 324,
	"./me.js": 324,
	"./mi": 325,
	"./mi.js": 325,
	"./mk": 326,
	"./mk.js": 326,
	"./ml": 327,
	"./ml.js": 327,
	"./mr": 328,
	"./mr.js": 328,
	"./ms": 329,
	"./ms-my": 330,
	"./ms-my.js": 330,
	"./ms.js": 329,
	"./my": 331,
	"./my.js": 331,
	"./nb": 332,
	"./nb.js": 332,
	"./ne": 333,
	"./ne.js": 333,
	"./nl": 334,
	"./nl-be": 335,
	"./nl-be.js": 335,
	"./nl.js": 334,
	"./nn": 336,
	"./nn.js": 336,
	"./pa-in": 337,
	"./pa-in.js": 337,
	"./pl": 338,
	"./pl.js": 338,
	"./pt": 339,
	"./pt-br": 340,
	"./pt-br.js": 340,
	"./pt.js": 339,
	"./ro": 341,
	"./ro.js": 341,
	"./ru": 342,
	"./ru.js": 342,
	"./sd": 343,
	"./sd.js": 343,
	"./se": 344,
	"./se.js": 344,
	"./si": 345,
	"./si.js": 345,
	"./sk": 346,
	"./sk.js": 346,
	"./sl": 347,
	"./sl.js": 347,
	"./sq": 348,
	"./sq.js": 348,
	"./sr": 349,
	"./sr-cyrl": 350,
	"./sr-cyrl.js": 350,
	"./sr.js": 349,
	"./ss": 351,
	"./ss.js": 351,
	"./sv": 352,
	"./sv.js": 352,
	"./sw": 353,
	"./sw.js": 353,
	"./ta": 354,
	"./ta.js": 354,
	"./te": 355,
	"./te.js": 355,
	"./tet": 356,
	"./tet.js": 356,
	"./th": 357,
	"./th.js": 357,
	"./tl-ph": 358,
	"./tl-ph.js": 358,
	"./tlh": 359,
	"./tlh.js": 359,
	"./tr": 360,
	"./tr.js": 360,
	"./tzl": 361,
	"./tzl.js": 361,
	"./tzm": 362,
	"./tzm-latn": 363,
	"./tzm-latn.js": 363,
	"./tzm.js": 362,
	"./uk": 364,
	"./uk.js": 364,
	"./ur": 365,
	"./ur.js": 365,
	"./uz": 366,
	"./uz-latn": 367,
	"./uz-latn.js": 367,
	"./uz.js": 366,
	"./vi": 368,
	"./vi.js": 368,
	"./x-pseudo": 369,
	"./x-pseudo.js": 369,
	"./yo": 370,
	"./yo.js": 370,
	"./zh-cn": 371,
	"./zh-cn.js": 371,
	"./zh-hk": 372,
	"./zh-hk.js": 372,
	"./zh-tw": 373,
	"./zh-tw.js": 373
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 500;

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MegaFanzApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_reset_reset__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__ = __webpack_require__(141);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MegaFanzApp = (function () {
    function MegaFanzApp(platform, statusBar, splashScreen) {
        this.loggedInPages = [
            { title: 'Profile', name: 'ProfilePage', component: __WEBPACK_IMPORTED_MODULE_8__pages_profile_profile__["a" /* ProfilePage */], icon: 'person' },
            { title: 'Logout', name: 'TabsPage', component: __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */], icon: 'log-out', logsOut: true }
        ];
        this.loggedOutPages = [
            { title: 'Login', name: 'LoginPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */], icon: 'log-in' },
            { title: 'Signup', name: 'SignupPage', component: __WEBPACK_IMPORTED_MODULE_6__pages_signup_signup__["a" /* SignupPage */], icon: 'person-add' },
            { title: 'Reset Password', name: 'ResetPage', component: __WEBPACK_IMPORTED_MODULE_7__pages_reset_reset__["a" /* ResetPage */], icon: 'person-add' }
        ];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MegaFanzApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
], MegaFanzApp.prototype, "nav", void 0);
MegaFanzApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MegaFanzApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_js__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__ = __webpack_require__(491);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * class: AuthServiceProvider
 * Set of functions that provide authentication service for login using Auth0.
 * Users can login using the Auth0 database with a username/password or via
 * social login using Google.
 *
 * Auth0 documentation: https://github.com/auth0/auth0.js & https://auth0.com/docs/api/authentication
 */
var AuthServiceProvider = (function () {
    /**
     * @constructor
     * @param http - perform remote HTTP requests
     * @param storage - storage for user session
     * @param events - publish login/logout events
     */
    function AuthServiceProvider(http, storage, events) {
        this.http = http;
        this.storage = storage;
        this.events = events;
        //auth0.js client side library for interacting with Auth.js
        this.auth0 = new __WEBPACK_IMPORTED_MODULE_4_auth0_js___default.a.WebAuth({
            domain: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].domain,
            clientID: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].clientID
        });
    }
    /**
     * user login using Auth0 social login connector
     */
    AuthServiceProvider.prototype.socialLogin = function () {
        console.log("<< socialLogin");
        //trigger OAuth flow to obtain an access token
        this.auth0.authorize({
            connection: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].social.connection,
            responseType: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].social.responseType,
            redirectUri: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].social.redirectUri
        }), function (err, resp) {
            if (err)
                return false;
        };
        console.log(">> socialLogin");
    };
    /**
     * after user provides credentials to social provider, it will callback user with access token
     */
    AuthServiceProvider.prototype.socialLoginCallback = function () {
        var _this = this;
        console.log("<< socialLoginCallback");
        // access token is provided after '#' for a successful login
        this.auth0.parseHash(window.location.hash, function (err, authResult) {
            if (err) {
                return console.log(err);
            }
            //parse the access token to obtain the user identity
            _this.getUserInfo(authResult);
        });
        console.log(">> socialLoginCallback");
    };
    /**
     *
     * user login using Auth0 database service
     * Tutorial: https://auth0.com/docs/api-auth/tutorials/password-grant
     *
     * @param username - username for user
     * @param password - password for user
     */
    AuthServiceProvider.prototype.login = function (username, password) {
        var _this = this;
        console.log("<< login");
        var config = {
            realm: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].database.realm,
            username: username,
            password: password,
            audience: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].database.audience,
            scope: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].database.scope,
        };
        //perform login via auth0.js library
        this.auth0.client.login(config, function (err, authResult) {
            //check for successful login
            if (authResult && authResult.accessToken && authResult.idToken) {
                //build the user session
                _this.getUserInfo(authResult);
            }
            else if (err) {
                _this.events.publish('user:error', err);
            }
        });
        console.log(">> login");
    };
    /**
     * build a user session, parsing the access token to obtain the user identity
     * @param authResult - access token for the user
     */
    AuthServiceProvider.prototype.getUserInfo = function (authResult) {
        var _this = this;
        console.log("<< getUserInfo");
        //decode access token
        this.auth0.client.userInfo(authResult.accessToken, function (err, user) {
            if (err) {
                // console.log(JSON.stringify(err));
                _this.events.publish('user:error', err);
            }
            else {
                _this.setSession(authResult, user);
            }
        });
        console.log(">> getUserInfo");
    };
    /**
     * perform user signup using Auth0 database service
     * @param username - name of user
     * @param password - password of user
     * @param firstName - first name of user
     * @param lastName - last name of user
     */
    AuthServiceProvider.prototype.signup = function (username, password, firstName, lastName) {
        var _this = this;
        console.log("<< signup");
        //perform signup
        this.auth0.signup({
            connection: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].database.realm,
            email: username,
            password: password,
            user_metadata: { "firstName": firstName, "lastName": lastName }
        }, function (err) {
            //signup error
            if (err) {
                console.log("user signup failed");
                _this.events.publish('user:error', err);
            }
            else {
                console.log("user signup is successful");
                //trigger login after signup
                _this.login(username, password);
            }
        });
        console.log(">> signup");
    };
    /**
     * perform password reset using Auth0 login service
     * @param username - email adddress of user
     */
    AuthServiceProvider.prototype.changePassword = function (username) {
        var _this = this;
        console.log("<< changePassword");
        //change password for user based on email address
        return this.auth0.changePassword({
            connection: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].database.realm,
            email: username
        }, function (err, resp) {
            if (err)
                return false;
            console.log("Email is sent to reset password with details %s", JSON.stringify(resp));
            //send user back to login page
            _this.logout();
            console.log(">> changePassword");
            return true;
        });
    };
    /**
     * creates a user session in storage with details from the access token
     * @param authResult - access token with identity information
     * @param user - name of the user
     */
    AuthServiceProvider.prototype.setSession = function (authResult, user) {
        var _this = this;
        console.log(">> setSession");
        //clear any existing storage
        this.storage.clear().then(function (err) {
            // Set the expiration time for the access token
            var expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            var session = {
                "expiry": expiresAt,
                "access_token": authResult.accessToken,
                "id_token": authResult.idToken,
                "user": user
            };
            //create the user session
            _this.storage.set('user', session).then(function (data) {
                //publish login event 
                _this.events.publish('user:login', data.user.name);
            });
        });
    };
    /**
     * return the user session from storage
     */
    AuthServiceProvider.prototype.getSession = function () {
        console.log("<< getSesssion");
        //return user session (only single session can exist at one time)
        return this.storage.get('user').then(function (session) {
            if (!session) {
                console.log("Unable to find user.");
                console.log(">> getSesssion");
                return null;
            }
            else {
                console.log("Returning user with name %s.", session.user.name);
                var profile = {
                    "id": session.user.sub.split('|')[1],
                    "name": session.user.name,
                    "email": session.user.email,
                    "picture": session.user.picture,
                };
                console.log(">> getSession");
                return profile;
            }
        });
    };
    // 
    /**
     * perform logout action (for the user) using the Auth0 login service.
     * Remove the access token and expiry time from localStorage
     */
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        console.log("<< logout");
        //clear local storage
        this.storage.clear().then(function (err) {
            _this.events.publish('user:logout');
            console.log("Successfully logged out user");
            //revoke the access token from auth0 so it cannot be reused
            _this.auth0.logout({
                returnTo: __WEBPACK_IMPORTED_MODULE_5__global_service_global_params__["a" /* AUTH_CONFIG */].social.redirectUri,
            }, function (err) {
                if (err)
                    return alert('Unable to revoke access token from login service: ' + err.message);
            });
        });
        console.log(">> logout");
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */]])
], AuthServiceProvider);

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidator; });
/**
 * class: PasswordValidator
 *
 * helper class to validate password and provide strength indicator
 */
var PasswordValidator = (function () {
    function PasswordValidator() {
    }
    /**
     * checks if the password fields match when confirming password entries
     * @param control - form control containing password fields
     */
    PasswordValidator.isValid = function (control) {
        if (control.parent) {
            var password = control.parent.controls['password'].value;
            var password2 = control.parent.controls['password2'].value;
            if (password != password2) {
                return {
                    "no_match": true
                };
            }
        }
        return null;
    };
    /**
     * check password based on a set of password rules for a good password
     * @param control - form control
     */
    PasswordValidator.passwordStrength = function (control) {
        if (control.parent) {
            var password = control.parent.controls['password'].value;
            if (password.length < 8) {
                return { "bad_password": true };
            }
            else if (password.search(/\d/) == -1) {
                return { "bad_password": true };
            }
            else if (!(password.match(/[a-z]/) && password.match(/[A-Z]/))) {
                return { "bad_password": true };
            }
            else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
                return { "bad_password": true };
            }
        }
        return null;
    };
    return PasswordValidator;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scores_scores__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__players_players__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__teams_teams__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__news_news__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_global_service_global_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * class: TabsPage
 */
var TabsPage = (function () {
    /**
     * @constructor
     * @param global
     * @param events
     * @param authService
     * @param storage
     */
    function TabsPage(global, events, authService, storage) {
        var _this = this;
        this.global = global;
        this.events = events;
        this.authService = authService;
        this.storage = storage;
        //list of tabs
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_5__news_news__["a" /* NewsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__scores_scores__["a" /* ScoresPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__players_players__["a" /* PlayersPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__teams_teams__["a" /* TeamsPage */];
        console.log("<< TabsPage");
        //track if user has logged in to display popup menu
        //subscribe to login event
        this.events.subscribe('user:login', function (evt) {
            _this.global.setLogin(true);
        });
        //subscribe to logout event
        this.events.subscribe('user:logout', function (evt) {
            _this.global.setLogin(false);
        });
        console.log(">> TabsPage");
    }
    /**
     * check for access token from social provider
     */
    TabsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("<< ionViewDidLoad");
        //check for access token from social provider in the browser url
        if (window.location.hash.indexOf("access_token") > 0) {
            this.authService.socialLoginCallback();
        }
        else {
            this.storage.get('user').then(function (session) {
                if (session) {
                    _this.global.setLogin(true);
                }
            });
        }
        console.log(">> ionViewDidLoad");
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/tabs/tabs.html"*/'<ion-tabs color="primary">\n  <ion-tab [root]="tab1Root" tabTitle="News" tabIcon="paper"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Scores" tabIcon="clipboard"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Players" tabIcon="people"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Teams" tabIcon="basketball"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__providers_global_service_global_service__["a" /* GlobalServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["c" /* Events */],
        __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_teams_teams__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_timezone__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment_timezone__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * class: ScoresPage
 *
 * modal page that displays list of scores for a team(s) on a given date
 */
var ScoresPage = (function () {
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
    function ScoresPage(navCtrl, viewCtrl, navParams, loadingCtrl, popoverCtrl, teamsProvider, global) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.teamsProvider = teamsProvider;
        this.global = global;
        this.segment = 'nhl';
        this.team = 'all';
        this.scores = [];
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
            this.date = __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default()(this.navParams.get('date'), 'YYYY-MM-DD').toISOString();
        }
        else {
            //moment formats current time with the appropriate timezone
            this.date = __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default()().tz('America/Toronto').format('YYYY-MM-DD');
        }
        this.getScores(this.date, false);
        console.log(">> ScoresPage");
    }
    /**
     * tracks the current league and date (and formats it to ISO 8601 standard)
     * @param button - currently selected league
     */
    ScoresPage.prototype.onSegmentChange = function (button) {
        console.log("<< onSegmentChange");
        this.segment = button;
        this.date = __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default()(this.date, __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default.a.ISO_8601).format('YYYY-MM-DD');
        this.getScores(this.date, false);
        console.log(">> onSegmentChange");
    };
    /**
     * tracks the current date when user changes it and triggers call to the update scores
     */
    ScoresPage.prototype.changeDate = function () {
        console.log("<< changeDate");
        var convertDate = __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default()(this.date, __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default.a.ISO_8601).format('YYYY-MM-DD');
        this.getScores(convertDate, false);
        console.log(">> changeDate");
    };
    /**
     * retrieves list of scores based on the @param date. Optionally refetch scores data with the @param refresh flag
     * @param date
     * @param refresh
     */
    ScoresPage.prototype.getScores = function (date, refresh) {
        var _this = this;
        console.log("<< getScores");
        this.global.presentLoading();
        //obtain the list of teams for a league
        this.teamsProvider.getTeams(this.segment).subscribe(function (teams) {
            //get the scores for each team at a given date, optionally force a refresh
            _this.teamsProvider.getScores(_this.segment, date, refresh).subscribe(function (data) {
                _this.global.closeLoading();
                //return the data for all games
                if ((_this.team === 'all')) {
                    _this.scores = data;
                }
                else {
                    _this.scores = data.filter(function (score) {
                        //home team matches current team
                        if (_this.team.toLowerCase().indexOf(score.home.toLowerCase()) >= 0) {
                            return score;
                        }
                        else if (_this.team.toLowerCase().indexOf(score.away.toLowerCase()) >= 0) {
                            return score;
                        }
                        else {
                            var awayTeam = score.away.split(' ').join('-').toLowerCase();
                            var homeTeam = score.home.split(' ').join('-').toLowerCase();
                            awayTeam = awayTeam.split('la-')[1] || awayTeam.split('ny-')[1] || awayTeam.toLowerCase();
                            homeTeam = homeTeam.split('la-')[1] || homeTeam.split('ny-')[1] || homeTeam.toLowerCase();
                            if (_this.team.toLowerCase().indexOf(awayTeam) >= 0 || _this.team.toLowerCase().indexOf(homeTeam) >= 0) {
                                return score;
                            }
                        }
                    });
                }
            }, function (error) {
                _this.scores = [];
                _this.global.closeLoading();
            });
        });
        console.log(">> getScores");
    };
    /**
     * refetch list of scores for the currently seleced date
     * @param refresher - ui component for refreshing data
     */
    ScoresPage.prototype.doRefresh = function (refresher) {
        console.log("<< doRefresh");
        refresher.complete();
        var convertDate = __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default()(this.date, __WEBPACK_IMPORTED_MODULE_4_moment_timezone___default.a.ISO_8601).format('YYYY-MM-DD');
        this.getScores(convertDate, true);
        console.log(">> doRefresh");
    };
    /**
     * close the modal
     */
    ScoresPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    return ScoresPage;
}());
ScoresPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
        selector: 'page-scores',template:/*ion-inline-start:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/scores/scores.html"*/'<ion-header *ngIf="team === \'all\'">\n	<ion-navbar color="primary">\n		<ion-title>Scores</ion-title>\n		<ion-buttons end>\n			<button ion-button icon-only (click)="global.presentPopover($event)">\n			  <ion-icon name="contact" isActive="true"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n	<ion-grid class="button-group" sticky>\n		<ion-row>\n			<ion-col>\n				<button ion-button icon-start block color="primary" [outline]="this.segment != \'nhl\'" (click)="this.onSegmentChange(\'nhl\');">\n					<ion-icon name="icon-ci-hockey"></ion-icon>\n					NHL\n				  </button>\n			</ion-col>\n			<ion-col>\n				<button ion-button icon-start block [outline]="this.segment != \'nba\'" (click)="this.onSegmentChange(\'nba\');">\n					<ion-icon name=\'basketball\' is-active="false"></ion-icon>\n					NBA\n				  </button>\n			</ion-col>\n			<ion-col>\n				<button ion-button icon-start block [outline]="this.segment != \'mlb\'" (click)="this.onSegmentChange(\'mlb\');">\n					  <ion-icon name=\'baseball\' is-active="false"></ion-icon>\n					  MLB\n					</button>\n			</ion-col>\n		</ion-row>\n	</ion-grid>\n</ion-header>\n\n<ion-header *ngIf="team != \'all\'">\n	<ion-navbar color="primary">\n		<ion-title *ngIf="team">{{team}}</ion-title>\n		<ion-buttons end>\n			<button ion-button (click)="closeModal()">Close</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content *ngIf="team">\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n	<ion-item color="dark">\n		<ion-label>Select Date</ion-label>\n		<ion-datetime displayFormat="MMM DD, YYYY" min="2017" max="2017" [(ngModel)]="date" (ionChange)="changeDate()"></ion-datetime>\n	</ion-item>\n\n	<p *ngIf="scores && scores.length == 0">No games available</p>\n\n	<ion-item-group *ngFor="let score of scores">\n		<ion-card color="light" (click)="global.openLink(score.url)">\n			<ion-card-content style="padding: 0;">\n				<ion-list no-lines>\n					<ion-item color="light">\n						<ion-avatar item-start>\n							<img [src]="score.homeLogo" />\n						</ion-avatar>\n						<ion-label>{{score.home}}</ion-label>\n						<ion-label>{{score.homeScore}}</ion-label>\n					</ion-item>\n					<ion-item color="light">\n						<ion-avatar item-start>\n							<img [src]="score.awayLogo" />\n						</ion-avatar>\n						<ion-label>{{score.away}}</ion-label>\n						<ion-label>{{score.awayScore}}</ion-label>\n					</ion-item>\n					<ion-item color="light">\n						<p>{{score.status}}</p>\n					</ion-item>\n				</ion-list>\n			</ion-card-content>\n		</ion-card>\n	</ion-item-group>\n</ion-content>'/*ion-inline-end:"/Users/ozairs/git/tutorials/megafanz/client/megafanz/src/pages/scores/scores.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1__providers_teams_teams__["a" /* TeamsProvider */], __WEBPACK_IMPORTED_MODULE_0__providers_global_service_global_service__["a" /* GlobalServiceProvider */]])
], ScoresPage);

//# sourceMappingURL=scores.js.map

/***/ })

},[408]);
//# sourceMappingURL=main.js.map