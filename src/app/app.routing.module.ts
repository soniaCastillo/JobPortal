import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { BrowserJobComponent } from "./components/browserJob/browserJob.component";
import { LoginComponent } from "./components/login/login.component";
import { NewUserComponent } from "./components/newUser/newUser.component";
import { GuardAdminService } from "./services/guardAdmin.service";
import { JobComponent } from "./components/job/job.component";
import { GuardLoginService } from "./services/guardLogin.service";

// this names have to be the same inside menu component
const routes:Routes=[
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'browser', component: BrowserJobComponent, canActivate: [GuardLoginService] },
    { path: 'login', component: LoginComponent },
    { path: 'newUser', component: NewUserComponent },
    { path: 'job', component: JobComponent, canActivate: [GuardAdminService,GuardLoginService] },
];

@NgModule({

    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]


})
export class AppRoutingModule{
}