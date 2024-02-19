import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { rejects } from 'assert';

@Injectable({
    providedIn: 'root'

})
export class AuthenticationService {

    loggedIn = false;
    administrator = false;
    
    login() {
      this.loggedIn = true;
    }
    logout() {
      this.loggedIn = false;
    }
     isAuthenticated() {
    
      const  promise = new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      });
     
      return promise;
    }
    isAdministrator() {
    
      const  promise = new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
          resolve(this.administrator);
        }, 800);
      });
     
      return promise;
    }
}
