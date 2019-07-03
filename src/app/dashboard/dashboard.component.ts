import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/chatt.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
  

  }
logout() {
  this.authservice.logout();
  this.router.navigate(['/login1']);
}



}

