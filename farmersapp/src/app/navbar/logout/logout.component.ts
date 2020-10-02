import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isLogin = 'Login';
  constructor(private router: Router) { }

  ngOnInit() {
    if (!!localStorage.getItem('token')) {
      this.isLogin = 'Logout';
    }
  }
/**
 *
 *
 * @memberof LogoutComponent
 */
logout() {
    if (this.isLogin === 'Logout') {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
