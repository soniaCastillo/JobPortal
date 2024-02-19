import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/dataBase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm !: FormGroup;
  constructor(private  Data: DataBaseService,private router: Router) { }
  mensaje = '';
  
  async onSubmit(){
   const form =  this.loginForm.value;
   const response = await this.Data.searchUser(form.username,form.password);
  // console.log(""+this.Data.exist);
   if(this.Data.exist)
   {
      this.loginForm.reset();
      this.router.navigate(['/home']);
   }
   else
   {
      this.mensaje = "username or password is incorrect";

   }
   
  }

  ngOnInit(): void {

   this.loginForm = new FormGroup({
                    username: new FormControl(null, Validators.required),
                    password: new FormControl(null, [Validators.required])
     
      
    });
  }


}
