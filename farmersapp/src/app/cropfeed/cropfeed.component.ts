import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cropfeed',
  templateUrl: './cropfeed.component.html',
  styleUrls: ['./cropfeed.component.css']
})
export class CropfeedComponent implements OnInit {

  dataState: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getData.subscribe(data => this.dataState = data);
  }

  fetchcontentpage(n: number) {
    console.log(`Page number ${n} is to be shown`);
  }
}
