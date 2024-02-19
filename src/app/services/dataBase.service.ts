import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Login } from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Job } from '../interfaces/job.interface';

@Injectable({
  providedIn: 'root'
})

export class DataBaseService {
  items: Observable<any[]> | undefined;
  exist : boolean | undefined;
constructor(private firestore:Firestore, private auth:AuthenticationService) { }

// **************** User ****************************
async addUser(user: Login): Promise<void> {
  try {
    const userRef = collection(this.firestore, 'Users'); // Get a reference to the 'Users' collection
    await addDoc(userRef, user); // Add the 'user' object to the 'Users' collection
    console.log('User added successfully:', user);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; // Rethrow the error for the caller to handle
  }
}
searchUser(user: string, password: string): Promise<boolean>
{
  return new Promise((resolve, reject) => {
    const collectionInstance = collection(this.firestore, 'Users');
    const queryInstance = query(collectionInstance, where("username", "==", user), where("password", "==", password));

    collectionData(queryInstance).subscribe(snapshot => {
      if (snapshot.length === 0) {
       // console.log('Email match NOT found');
        this.exist = false; // Update this.Data.exist when user is not found
        resolve(false); // Resolve the promise with false if no user is found
      } else {
        this.auth.login();
        this.exist = true; // Update this.Data.exist when user is found
        if (snapshot[0]['rol'] === "administrator") {
          this.auth.administrator = true;
        
        }
        resolve(true); // Resolve the promise with true if user is found
      }
    }, error => {
      console.error('Error searching for user:', error);
      reject(error); // Reject the promise if an error occurs
    });
  });
}
// **************** Job ****************************
async addJob(job: Job): Promise<void> {
  try {
    const userRef = collection(this.firestore, 'Jobs'); 
    await addDoc(userRef, job); 
    console.log('User added successfully:', job);
  } catch (error) {
    console.error('Error adding job:', error);
    throw error; 
  }
}

}
