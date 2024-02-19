import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/dataBase.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobForm !: FormGroup;
  mensaje = '';
  constructor(private fb: FormBuilder,private  Data: DataBaseService,private router: Router) { }

  ngOnInit() {

    this.jobForm = this.fb.group({
      title: [null, Validators.required],
      category: [null, [Validators.required, this.validateCategory]],
      company: [null, Validators.required],
      salary: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required]
    });
  }
  validateCategory(control: FormControl) {
    const selectedCategory = control.value;
    if (selectedCategory === 'All') {
      return { 'categoryInvalid': true };
    }
    return null;
  }
  async onSubmit(){
    try {
    console.log(this.jobForm);
    const response = await this.Data.addJob(this.jobForm.value);
    this.mensaje = "Job successfully created";
    this.jobForm.reset();
   // this.router.navigate(['/login']);
  //  console.log(response);
  }
  catch (error) {
    console.error('Error adding user:', error);
  }
}
 
}
