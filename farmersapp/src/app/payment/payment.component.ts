import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { WindowRefService } from '../window-ref.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private data: DataService, private http: HttpClient, private winRef: WindowRefService) {
    this.pkey = this.data.getter().pkey;
    this.crop = this.data.getCrop(this.pkey);
  }

  orderId: any;
  res: any;
  amount: any;
  crop: any;
  pkey: any;
  ngOnInit() {
  }

payment = () => {
  this.pkey = this.data.getter().pkey;
  this.crop = this.data.getCrop(this.pkey);
  console.log(this.crop);
  this.amount = this.crop.fixed_price;
  console.log(this.data.getter());

  this.http.post('https://agritech-imageupload.herokuapp.com/generateOrder', { amount: this.amount })
      .subscribe(response => {
        console.log(response);
        this.res = response;
        this.orderId = this.res.order.id;
        const options = {
          key: 'rzp_test_pF12hv5Iz3DvNs',
          amount: this.amount,
          currency: 'INR',
          name: this.data.getter().username,
          description: 'Test',
          order_id: this.orderId,
          prefill: {
              name: this.data.getter().username,
              email: 'mohak.chugh@example.com',
              contact: '9810178257'
          },
          notes: {
              address: 'note value'
          },
          theme: {
              color: '#F37254'
          },
          handler: (res: any) => {
            console.log(res);
        }
      };
        console.group('Checking order id');
        console.log('Checking orderid');
        console.log(this.orderId);
        console.groupEnd();
        const rzp = new this.winRef.nativeWindow.Razorpay(options);
        rzp.open();
      });

  }
}
