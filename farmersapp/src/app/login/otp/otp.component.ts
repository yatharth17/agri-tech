import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  phoneNumber = 0;
  sessionId = '';
  otp = 0;
  message = '';
  name = '';
  otprequested = false;
  response = '';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  requestotp() {
    this.http.post('https://farmersauth.herokuapp.com/loginotp', {
      phone_number: this.phoneNumber
    }).subscribe(res => {
      console.log(res);
      this.response = JSON.stringify(res);
      this.response = JSON.parse(this.response);
      this.sessionId = this.response;
      // localStorage.setItem('sessionid', JSON.stringify(res));
      this.otprequested = true;
    });
  }

  verifyotp() {
    this.http.post('https://farmersauth.herokuapp.com/verifyotp', {
      otp: this.otp,
      session_id: this.sessionId
    }).subscribe(res => {
      console.log(res);
      this.response = JSON.stringify(res);
      this.response = JSON.parse(this.response);
      console.log(this.response);

      // tslint:disable-next-line: triple-equals
      if (this.response == 'OTP Mismatch') {
        this.message = 'The OTP you entered in incorrect! Please try again';
      } else {
        localStorage.setItem('token', JSON.stringify(this.sessionId));
        this.router.navigate(['/feed']);
      }
    });
  }

}
