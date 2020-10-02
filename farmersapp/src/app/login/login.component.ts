import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataState: any;
  otp = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService: DataService
  ) {
    if (!!localStorage.getItem('token')) {
      this.dataService.setdata('token', localStorage.getItem('token'));
      this.dataService.setdata('username', localStorage.getItem('username'));
      router.navigate(['/feed']);
    }
  }
  name: string;
  password: string;
  data = {};
  rooturl = 'https://farmersauth.herokuapp.com';
  isLoading = false;
  message = '';

  ngOnInit() {
    this.dataService.getData.subscribe(data => this.dataState = data);
  }

login() {
    this.isLoading = true;
    localStorage.setItem('username', JSON.stringify(this.name.split('@')[0]));
    this.dataService.setdata('username', JSON.stringify(this.name.split('@')[0]));
    this.data = {
      email: this.name,
      password: this.password
    };
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    try {
      // tslint:disable-next-line: triple-equals
      if (this.password == undefined || this.name == undefined) {
        throw new Error('EMAIL OR PASSWORD REQUIRED');
      }
      this.http.post(this.rooturl + '/loginuser', this.data, { headers }).subscribe(token => {
        this.isLoading = false;
        // tslint:disable-next-line: triple-equals
        if (token == 'Email not verified') {
          this.message = 'Email not verified';
          // tslint:disable-next-line: triple-equals
        } else if (token == 'The password is invalid or the user does not have a password.') {
          this.message = 'The password is invalid or the user does not have a password';
          // tslint:disable-next-line: triple-equals
        } else if (token == 'The email address is badly formatted.') {
          this.message = 'The email address is badly formatted';
          // tslint:disable-next-line: triple-equals
        } else if (token == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
          this.message = 'User does not exist. Please check';
          // tslint:disable-next-line: triple-equals
        } else if (token == 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.') {
          this.message = 'First argument "email" must be a valid string.';
        } else {
          localStorage.setItem('token', JSON.stringify(token));
          this.dataService.setdata('token', JSON.stringify(token));
          console.log(this.dataService);
          this.router.navigate(['/feed']);
        }
      });
    } catch (err) {
      this.isLoading = false;
      console.log(err);
      this.message = err;
      console.log(err);
    }
  }

  toggleotp() {
    this.otp = true;
  }
}
