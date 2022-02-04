import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private phones: Phone[] = [];

  private phoneSource = new BehaviorSubject<Phone>({
    id: null,
    title: null,
    image: null,
    price: null,
    numberInStock: null,
  });
  selectedPhone = this.phoneSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    const phone1: Phone = {
      id: 1,
      title: 'Samsung S20',
      image: 'assets/img/Samsung-Galaxy-S20-FE-Duos-128GB-Cloud-Navy-8806090716935-02102020-01-p.jpg',
      price: 850,
      numberInStock: 3,
    };

    const phone2: Phone = {
      id: 2,
      title: 'Motorola Edge+',
      image: 'assets/img/motorola-edge-plus-produto.png',
      price: 880,
      numberInStock: 1,
    };

    const phone3: Phone = {
      id: 3,
      title: 'Samsung S21',
      image: 'assets/img/Samsung-Galaxy-S21-5G-128GB-Phantom-Grey-8806090892776-18012021-01-p.jpg',
      price: 1000,
      numberInStock: 5,
    };

    this.phones = [phone1, phone2, phone3];
  }


  getPhones() {
    return of(this.phones);
  }

  getNextId() {
    return Math.max.apply(
      Math,
      this.phones.map((phone) => {
        return phone.id;
      })
    );
  }

  addPhone(phone: Phone) {
    this.phones.unshift(phone);
  }

  deletePhone(phone: Phone) {
    this.phones.forEach((curr, i) => {
      if (phone.id === curr.id) {
        this.phones.splice(i, 1);
      }
    });
  }

  updatePhone(phone: Phone) {
    this.phones.forEach((curr, i) => {
      if (phone.id === curr.id) {
        this.phones.splice(i, 1, phone);
      }
    });
    // this.phones.unshift(phone);
  }

  setFormPhone(phone: Phone) {
    this.phoneSource.next(phone);
  }

  clearState() {
    this.stateSource.next(true);
  }

  initState() {
    this.phoneSource = new BehaviorSubject<Phone>({
      id: null,
      title: null,
      image: null,
      price: null,
      numberInStock: null,
    });
    this.selectedPhone = this.phoneSource.asObservable();

    this.stateSource = new BehaviorSubject<boolean>(true);
    this.stateClear = this.stateSource.asObservable();
  }

  getPrice(kolicina: number, phone: Phone) {
    return kolicina * phone.price;
  }
}
