import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-addcrop',
  templateUrl: './addcrop.component.html',
  styleUrls: ['./addcrop.component.css']
})
export class AddcropComponent implements OnInit {

  // Image upload data
  selectedFile: File = null;
  isuploadingimage = false;
  imageUploaded = false;
  imageResponse: any;
  // Image upload data ends here

  name = '';
  quantity = 0;
  image: any;
  biddingPrice = 0;
  buyNow = 0;
  description = '';
  rooturl = 'https://farmersapp-bidding.herokuapp.com';
  addedurl = '/api/bid/create?';
  imageurl = 'http://dummyurlforcrops.com';
  token: any;
  res: any;
  message = '';
  time: any;
  // tslint:disable-next-line: variable-name
  seller_name: string;
  // tslint:disable-next-line: variable-name
  timer_limit: any;
  isuploading = false;
  headers: HttpHeaders;

  constructor(private http: HttpClient, private Data: DataService) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.isuploadingimage = true;
    const fd = new FormData();
    fd.append('file', this.selectedFile);
    this.http.post('https://agritech-imageupload.herokuapp.com/upload', fd)
      .subscribe(res => {
        this.isuploadingimage = false;
        this.imageUploaded = true;
        console.log(res);
        this.imageResponse = res;
        this.imageurl = this.imageResponse.Data[0].Location;

        setTimeout(() => {
          this.imageUploaded = false;
        }, 3000);

        console.log('Image Url for crop is ' + this.imageurl);
      });
  }

  post() {
    this.isuploading = true;
    this.fixTimer();
    this.seller_name = this.Data.getter().username || `Mohak Chugh`;
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    this.http.post(this.rooturl + this.addedurl, {
      item_name: this.name,
      item_description: this.description,
      image_url: this.imageurl,
      min_price: this.biddingPrice,
      buy_now_price: this.buyNow,
      quantity: this.quantity,
      timer_limit: this.timer_limit,
      token: this.token,
      seller_name: this.seller_name
    }, { headers })
      .subscribe(response => {
        // console.log(response);
        this.isuploading = false;
        this.res = response;
        console.log(this.res.error);
        console.log(this.res.success);
        if (this.res.error === false) {
          if (this.res.success === true) {
            console.log('Now uploaded!');
            this.message = `Details Uploaded Successfully!`;
            setTimeout(() => {
              this.message = '';
            }, 10000);
          }
        }
    });
  }

  private fixTimer() {
    this.time = this.timer_limit;
    this.timer_limit = `${this.time}:00:00`;
  }
}
