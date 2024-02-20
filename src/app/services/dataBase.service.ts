import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Login } from '../interfaces/login.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Job } from '../interfaces/job.interface';
import { DocumentReference, CollectionReference } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})

export class DataBaseService {
  items: Observable<any[]> | undefined;
  exist : boolean | undefined;
  // to update
  private jobSubject = new BehaviorSubject<{ id: string, data: Job } | null>(null);
  job$ = this.jobSubject.asObservable();

  jobChanges: Subject<void> = new Subject<void>(); // notify if there is changes
  
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
          console.log('Es administrador');
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

async getJobs(): Promise<{ id: string, data: Job }[]> {
  try {
    const querySnapshot = await getDocs(collection(this.firestore, 'Jobs'));
    const jobs: { id: string, data: Job }[] = [];
    querySnapshot.forEach(doc => {
      const job = doc.data() as Job;
      const id = doc.id;
      jobs.push({ id, data: job });
    });
    console.log('Jobs retrieved successfully:', jobs);
    return jobs;
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
}

async getJobsByParameter(user: string): Promise<Job[]> {
  try {
    const querySnapshot = await getDocs(query(collection(this.firestore, 'Jobs'), where('parameterName', '==', user)));
    const jobs: Job[] = [];
    querySnapshot.forEach(doc => {
      const job = doc.data() as Job;
      jobs.push(job);
    });
    console.log('Jobs retrieved successfully:', jobs);
    return jobs;
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
}


async updateJob(id: string, updatedJob: Partial<Job>): Promise<void> {
  try {
    const jobRef = doc(collection(this.firestore, 'Jobs'), id);
    await updateDoc(jobRef, updatedJob);
    console.log('Job updated successfully:', id);
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
}

async deleteJob(id: string): Promise<void>  {
  try {
    const jobRef = doc(collection(this.firestore, 'Jobs'), id);
    await deleteDoc(jobRef);
    console.log('Job deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
}

setJob(job: { id: string, data: Job }) {
  this.jobSubject.next(job);
}

getJob(): { id: string, data: Job } | null {
  return this.jobSubject.value;
}
// Call this method after a successful update or insertion
notifyJobChanges() {
  this.jobChanges.next();
}
}
