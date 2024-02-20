import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { BrowserJobComponent } from './components/browserJob/browserJob.component';

import { environment } from 'src/environments/environment';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';

import { provideRoutes } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './components/home/home.component';
import { NewUserComponent } from './components/newUser/newUser.component';
import { JobComponent } from './components/job/job.component';
import { JobsListComponent } from './components/jobsList/jobsList.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BrowserJobComponent, 
    LoginComponent,
    FooterComponent,
    HomeComponent,
    NewUserComponent,
    JobComponent,
    JobsListComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(()=>getFirestore())
  
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
