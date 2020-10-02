import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {

  token: any;
  rooturl = 'https://farmersapp-bidding.herokuapp.com';
  addedurl = '/api/bid?';
  res: any;
  items = [];
  timeout: Array<boolean> = [false];
  endtime: Array<Date> = [new Date()];
  time: Date;

  /**
   *Creates an instance of RelatedProductsComponent.
   * @param {HttpClient} http
   * @param {DataService} dataFromService
   * @memberof RelatedProductsComponent
   */
  constructor(private http: HttpClient, private dataFromService: DataService) {
    this.token = localStorage.getItem('token');
    this.items = this.dataFromService.getter().items;
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index]; this.time = new Date();
      this.time = new Date();
      this.endtime[index] = new Date(element.timer_end);
      if (this.time > this.endtime[index]) {
        this.timeout[index] = true;
      }
    }
  }

  ngOnInit() {
  }

}
