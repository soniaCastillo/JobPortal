import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Job } from 'src/app/interfaces/job.interface';
import { DataBaseService } from 'src/app/services/dataBase.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobForm !: FormGroup;
  mensaje = '';
  // receive the data from job
  job: { id: string, data: Job } | null = null;
  @Input() detailJob: Job | undefined;  
  constructor(private fb: FormBuilder,private  Data: DataBaseService,private router: Router) { }

  ngOnInit() {

   
    this.mensaje="";
    this.jobForm = this.fb.group({
      title: [null, Validators.required],
      category: [null, [Validators.required, this.validateCategory]],
      company: [null, Validators.required],
      salary: [null, Validators.required],
      location: [null, Validators.required],
      description: [null, Validators.required]
    });
     this.Data.job$.subscribe(job => {
      this.job = job;
      this.updateForm();
    });
   
  }
  updateForm(): void {
    if (this.job) {
      this.jobForm.patchValue({

        id: this.job.id,
        title: this.job.data.title,
        category: this.job.data.category,
        company: this.job.data.company,
        salary: this.job.data.salary,
        location: this.job.data.location,
        description: this.job.data.description
        
        // Patch other form controls with corresponding job data
      });
     
    }
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
   // console.log("id"+this.job?.id);
   this.mensaje="";
    if (this.job?.id !== undefined && this.job?.id !=="" ) // update
    {
      const id = this.job?.id;
      const response = await this.Data.updateJob(this.job.id, this.jobForm.value);
      this.mensaje = "Job successfully updated";
      this.job.id="";
      this.jobForm.reset();
    
    }
    else // insert
    {
      const response = await this.Data.addJob(this.jobForm.value);
      this.mensaje = "Job successfully created";
     if (this.job?.id !== undefined && this.job?.id !=="" ) 
      {
        this.job.id="";
      }
      this.jobForm.reset();
      
    }
  
   
    this.Data.notifyJobChanges();
   // this.router.navigate(['/login']);
  //  console.log(response);
  }
  catch (error) {
    console.error('Error adding user:', error);
  }
}
 
}
