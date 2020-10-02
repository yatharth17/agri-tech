import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit, OnChanges {
  // tslint:disable-next-line: variable-name
  bid_price = 0;
  pkey: any;
  token: any;
  data: any;
  item: any = {
    bid: NaN,
    curr_bidprice: NaN,
    curr_highestBidderusername: NaN,
    description: NaN,
    fixed_price: NaN,
    quantity: NaN,
    name: NaN,
    sold_flag: NaN
  };
  buyerid: any;
  errorFlag = false;
  errorMessage = '';
  rooturl = 'https://farmersapp-bidding.herokuapp.com';
  addedurl = '/api/bid/get?';
  biddingurl = '/api/bid/place?';
  res: any;
  sms = ``;


  // tslint:disable-next-line: no-shadowed-variable
  constructor(private http: HttpClient, private DataService: DataService, private router: Router) {
    this.pkey = this.DataService.getter().pkey;
    this.token = this.DataService.getter().token;
    this.fetchCrop();
  }

  ngOnInit() {
    this.pkey = this.DataService.getter().pkey;
    this.token = this.DataService.getter().token;
    this.fetchCrop();
  }

  ngOnChanges() {
    this.fetchCrop();
  }

  notifysms(name, bidprice) {
    this.sms = `Hi, the current price of your bid ${name} is ${bidprice}`;
    // Phone Number hardcoded to 9810178257
    // FIXME: change auth url to the new one
    this.http.post('https://dry-harbor-38701.herokuapp.com/sendsms', {
      phone_number: 9810178257,
      sms: this.sms
    }).subscribe(res => {
      console.log(res);
    });
  }

  fetchCrop() {
    this.item = this.DataService.getCrop(this.pkey);
  }

  increaseby1() {
    this.bid_price += 500;
  }

  decreaseby1() {
    this.bid_price -= 500;
  }

  placebid() {
    // Make Http request to save the details of bid
    this.cookiegetter();
    console.log(this.token);
    console.log(this.pkey);
    console.log(this.bid_price);
    console.log(this.buyerid);

    console.log(typeof (this.bid_price));

    this.http.post(this.rooturl + this.biddingurl, {
      token: this.token,
      bid_id: this.pkey,
      bid_price: this.bid_price,
      buyer_id: this.buyerid
    }).subscribe(response => {
      // Change from here
      console.log(response);
      this.res = response;
      if (this.res.success === false) {
        this.errorFlag = true;
        this.errorMessage = JSON.stringify(this.res.message);
      } else if (this.res.success === true && this.res.error === 'cannot be sold') {
        this.errorFlag = true;
        this.errorMessage = JSON.stringify(this.res.message);
      } else {
        this.errorMessage = 'Bid Placed Successfully';
        this.notifysms(this.buyerid, this.bid_price);
        this.updateValueOfBid(this.bid_price);
        this.DataService.updateValue(this.pkey, this.item);
      }
    });
    this.timer();
  }

  private timer() {
    setTimeout(() => {
      this.errorMessage = '';
      this.errorFlag = false;
      this.fetchCrop();
    }, 5000);
  }

  private updateValueOfBid(bid: any) {
    this.item.curr_bidprice = bid;
  }

  private cookiegetter() {
    this.token = this.DataService.getter().token || localStorage.getItem('token');
    this.pkey = this.DataService.getter().pkey;
    this.buyerid = this.DataService.getter().username || localStorage.getItem('username');
  }
}
