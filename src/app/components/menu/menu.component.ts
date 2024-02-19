import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  logo = 'assets/img/logo.png';
  mostrarAdmin: boolean = false;  

  constructor(public auth: AuthenticationService ) { }

  ngOnInit() {
  }

  
  logout()
  {

    this.auth.logout();


  }

}
