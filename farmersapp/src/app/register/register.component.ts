import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  message = '';
  data = {};
  rooturl = 'https://farmersauth.herokuapp.com';
  addedurl = '/registeruser';
  /**
   *Creates an instance of RegisterComponent.
   * @param {Router} router
   * @param {HttpClient} http
   * @memberof RegisterComponent
   */
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }
  /**
   *
   *
   * @memberof RegisterComponent
   */
  register() {
    this.data = {
      email: this.email,
      password: this.password,
      name: this.name
    };
    JSON.stringify(this.data);
    this.http.post(this.rooturl + this.addedurl, this.data, {responseType: 'text'}).subscribe(token => {
      this.message = token.split('"')[1];
    });
  }
}
