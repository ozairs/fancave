import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import auth0 from 'auth0-js';
import { AUTH_CONFIG } from '../global-service/global-params';

/**
 * class: AuthServiceProvider
 * Set of functions that provide authentication service for login using Auth0. 
 * Users can login using the Auth0 database with a username/password or via
 * social login using Google.
 * 
 * Auth0 documentation: https://github.com/auth0/auth0.js & https://auth0.com/docs/api/authentication
 */
@Injectable()
export class AuthServiceProvider {

  //auth0.js client side library for interacting with Auth.js
  auth0: any = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID
  });

  /**
   * @constructor
   * @param http - perform remote HTTP requests
   * @param storage - storage for user session
   * @param events - publish login/logout events 
   */
  constructor(public http: Http, public storage: Storage, public events: Events) {
  }

  /**
   * user login using Auth0 social login connector
   */
  public socialLogin(): void {
    console.log("<< socialLogin");
    //trigger OAuth flow to obtain an access token
    this.auth0.authorize({
      connection: AUTH_CONFIG.social.connection,
      responseType: AUTH_CONFIG.social.responseType,
      redirectUri: AUTH_CONFIG.social.redirectUri
    }), (err, resp) => {
      if (err) return false;
    };
    console.log(">> socialLogin");
  }

  /**
   * after user provides credentials to social provider, it will callback user with access token
   */
  public socialLoginCallback(): void {
    console.log("<< socialLoginCallback");
    // access token is provided after '#' for a successful login
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (err) {
        return console.log(err);
      }
      //parse the access token to obtain the user identity
      this.getUserInfo(authResult)
    });
    console.log(">> socialLoginCallback");
  }


  /**
   * 
   * user login using Auth0 database service
   * Tutorial: https://auth0.com/docs/api-auth/tutorials/password-grant
   * 
   * @param username - username for user
   * @param password - password for user
   */
  public login(username, password): void {
    console.log("<< login");
    var config = {
      realm: AUTH_CONFIG.database.realm,
      username: username,
      password: password,
      audience: AUTH_CONFIG.database.audience,
      scope: AUTH_CONFIG.database.scope,
    };

    //perform login via auth0.js library
    this.auth0.client.login(config, (err, authResult) => {
      //check for successful login
      if (authResult && authResult.accessToken && authResult.idToken) {
        //build the user session
        this.getUserInfo(authResult);
      }
      else if (err) {
        this.events.publish('user:error', err);
      }
    });
    console.log(">> login");
  }

  /**
   * build a user session, parsing the access token to obtain the user identity
   * @param authResult - access token for the user
   */
  public getUserInfo(authResult): void {
    console.log("<< getUserInfo");
    //decode access token
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      if (err) {
        // console.log(JSON.stringify(err));
        this.events.publish('user:error', err);
      }
      //user token parsed successfully
      else {
        this.setSession(authResult, user);
      }
    });
    console.log(">> getUserInfo");
  }

  /**
   * perform user signup using Auth0 database service
   * @param username - name of user
   * @param password - password of user
   * @param firstName - first name of user
   * @param lastName - last name of user
   */
  public signup(username, password, firstName, lastName): void {
    console.log("<< signup");
    //perform signup
    this.auth0.signup({
      connection: AUTH_CONFIG.database.realm,
      email: username,
      password: password,
      user_metadata: { "firstName": firstName, "lastName": lastName }
    }, (err) => {
      //signup error
      if (err) {
        console.log("user signup failed");
        this.events.publish('user:error', err);
      }
      else {
        console.log("user signup is successful");
        //trigger login after signup
        this.login(username, password);
      }
    });
    console.log(">> signup");
  }

  /**
   * perform password reset using Auth0 login service
   * @param username - email adddress of user
   */
  public changePassword(username): Promise<boolean> {
    console.log("<< changePassword");
    //change password for user based on email address
    return this.auth0.changePassword({
      connection: AUTH_CONFIG.database.realm,
      email: username
    }, (err, resp) => {
      if (err) return false;

      console.log("Email is sent to reset password with details %s", JSON.stringify(resp));
      //send user back to login page
      this.logout();
      console.log(">> changePassword");
      return true;
    });
    
  }

  /**
   * creates a user session in storage with details from the access token
   * @param authResult - access token with identity information
   * @param user - name of the user
   */
  private setSession(authResult, user): void {
    console.log(">> setSession");

    //clear any existing storage
    this.storage.clear().then((err) => {
      // Set the expiration time for the access token
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      var session = {
        "expiry": expiresAt,
        "access_token": authResult.accessToken,
        "id_token": authResult.idToken,
        "user": user
      }
      //create the user session
      this.storage.set('user', session).then((data) => {
        //publish login event 
        this.events.publish('user:login', data.user.name);
      });
    });
  }

  /**
   * return the user session from storage
   */
  public getSession(): Promise<any> {
    console.log("<< getSesssion");
    //return user session (only single session can exist at one time)
    return this.storage.get('user').then((session) => {
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
        }
        console.log(">> getSession");
        return profile;
      }
    });
  }

  // 
  /**
   * perform logout action (for the user) using the Auth0 login service. 
   * Remove the access token and expiry time from localStorage
   */
  public logout(): void {
    console.log("<< logout");
    //clear local storage
    this.storage.clear().then((err) => {
      this.events.publish('user:logout');
      console.log("Successfully logged out user");
      //revoke the access token from auth0 so it cannot be reused
      this.auth0.logout({
        returnTo: AUTH_CONFIG.social.redirectUri,
      }, (err) => {
        if (err) return alert('Unable to revoke access token from login service: ' + err.message);
      });
    });
    console.log(">> logout");
  }

}
