import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataState: any;

  items = [];
  rooturl = 'https://farmersapp-bidding.herokuapp.com';
  addedurl = '/api/bid?';
  token: any;
  res: any;
  timeout: Array<boolean> = [false];
  endtime: Array<Date> = [new Date()];
  time: Date;


  ngOnInit() {
    this.data.getData.subscribe(data => this.dataState = data);
  }
  /**
   *Creates an instance of ProductsComponent.
   * @param {HttpClient} http
   * @param {DataService} data
   * @memberof ProductsComponent
   */
  constructor(private http: HttpClient, private data: DataService) {
    this.token = localStorage.getItem('token');

    http.post(this.rooturl + this.addedurl, { token: this.token })
      .subscribe(response => {
        // Change starts from here
        // console.log(response.message.bids.bid);
        this.res = response;
        this.items = this.res.message.bids;
        console.log(this.items);
        // Adding data to data service
        this.data.setdata('items', this.items);
        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          this.checkIfTimeExpired(index, element);
        }
      });
  }

  /**
   *
   *
   * @private
   * @param {number} index
   * @param {*} element
   * @memberof ProductsComponent
   */
  private checkIfTimeExpired(index: number, element: any) {
    this.time = new Date();
    this.endtime[index] = new Date(element.timer_end);
    if (this.time > this.endtime[index]) {
      this.timeout[index] = true;
    }
  }
  /**
   *
   * @param i id
   */
  savedetailsofitem(i) {
    localStorage.setItem('pkey', this.items[i]._id);
    this.data.setdata('pkey', this.items[i]._id);
  }
}
