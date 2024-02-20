import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job.interface';
import { DataBaseService } from 'src/app/services/dataBase.service';

@Component({
  selector: 'app-jobsList',
  templateUrl: './jobsList.component.html',
  styleUrls: ['./jobsList.component.css']
})
export class JobsListComponent implements OnInit {

  jobs: { id: string, data: Job }[] = [];
  
  constructor(private jobService: DataBaseService) { }

  ngOnInit() {
    this.getJobs();
    this.subscribeToJobChanges();
  }
  async getJobs() {
    try {
      this.jobs = await this.jobService.getJobs();
      console.log('Jobs:', this.jobs); // Log the retrieved jobs
    } catch (error) {
      console.error('Error getting jobs:', error);
    } 
  }
  private subscribeToJobChanges() {
    this.jobService.jobChanges.subscribe(() => {
      this.getJobs(); // Reload jobs when changes occur
    });
  }
  updateJob(id:string) {
   
    const jobToSend = this.jobs.find(job => job.id === id);
    if (jobToSend) {
      // If the job object is found, you can set it using your jobService
      this.jobService.setJob(jobToSend);
      console.log('Job to send:', jobToSend);
    } else {
      console.error('Job not found with ID:', id);
    }
    
  }

  deleteJob(id:string) {

    this.jobService.deleteJob(id)
        .then(() => {
            // Once the job is deleted successfully, fetch the updated list of jobs
            this.getJobs();
        })
        .catch(error => {
            console.error('Error deleting job:', error);
        });
}
}