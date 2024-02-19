import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/dataBase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-NewUser',
  templateUrl: './NewUser.component.html',
  styleUrls: ['./NewUser.component.css']
})
export class NewUserComponent implements OnInit {
  userForm !: FormGroup;
//  rol = ['user', 'administrator'];
  mensaje = '';
  constructor(private  Data: DataBaseService,private router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required]),
      rol: new FormControl('user'),


});
  }

  async onSubmit(){
    try {
    console.log(this.userForm);
    const response = await this.Data.addUser(this.userForm.value);
    this.mensaje = "User successfully created";
    this.userForm.reset();
    this.router.navigate(['/login']);
  //  console.log(response);
  }
  catch (error) {
    console.error('Error adding user:', error);
  }
}
}