import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  checkloggedin() {
    return !!localStorage.getItem('token');
  }
  constructor(private router: Router, private data: DataService) { }

  canActivate() {
    if (this.checkloggedin()) {
      this.data.setdata('username', localStorage.getItem('username'));
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
