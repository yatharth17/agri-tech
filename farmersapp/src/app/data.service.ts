import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private data: any = new BehaviorSubject<any>({});
  getData = this.data.asObservable();
  public setdata(key, value: any) {
    this.data[key] = value;
  }
  public getter() {
    return this.data;
  }

  /**
   *
   *
   * @param {*} pkey
   * @returns
   * @memberof DataService
   */
  public getCrop(pkey: any) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i]._id === pkey) {
        // console.group('Get Crop from Service');
        // console.log(this.data.items[i]);
        // console.groupEnd();
        return this.data.items[i];
      }
    }
  }

  /**
   *
   *
   * @param {*} pkey
   * @param {*} newData
   * @memberof DataService
   */
  public updateValue(pkey: any, newData: any) {
    for (let i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i]._id === pkey) {
        this.data.items[i] = newData;
        // console.groupCollapsed('Updated value of crop array');
        // console.log(this.data.items);
        // console.groupEnd();
      }
    }
  }
}
