import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-crop-product',
  templateUrl: './crop-product.component.html',
  styleUrls: ['./crop-product.component.css']
})
export class CropProductComponent implements OnInit {

  bidding = false;
  pkey: any;
  token: any;
  time: Date;
  rooturl = 'https://farmersapp-bidding.herokuapp.com';
  addedurl = '/api/bid/get?';
  timeout = false;
  endtime: any;
  data: any = {
    message: {
      bid: NaN,
      curr_bidprice: NaN,
      curr_highestBidderusername: NaN,
      description: NaN,
      fixed_price: NaN,
      quantity: NaN,
      name: NaN
    }
  };
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

  constructor(private http: HttpClient, private dataFromService: DataService) {
    this.pkey = this.dataFromService.getter().pkey;
    this.item = this.dataFromService.getCrop(this.pkey);
  }

  ngOnInit() {
  }

  togglebidding() {
    this.bidding = true;
  }

}
