import { flush } from "@angular/core/testing";

export class person {
  id: number;
  fullname: string;
  ngaySinh: string;
  cccd: string;
  gioiTinh: string;
  diaChi: string;
  fbWeb: string;
  balance: number;
  ngay: Date;
  transactions: transaction[] = [];
  constructor(
    id: number,
    fullname: string,
    ngaySinh: string,
    cccd: string,
    gioiTinh: string,
    diaChi: string,
    fbWeb: string,
    balance: number,
    ngay: Date,
    transactions: transaction[]
  ) {
    this.id = id;
    this.fullname = fullname;
    this.ngaySinh = ngaySinh;
    this.cccd = cccd;
    this.gioiTinh = gioiTinh;
    this.diaChi = diaChi;
    this.fbWeb = fbWeb;
    this.balance = balance;
    this.ngay = ngay;
    this.transactions = transactions;
  }
}
export class transaction {
  id: number;
  amount: number;
  balance: number;
  reason: string;
  date: Date;
  type: string;
  constructor(
    id: number,
    amount: number,
    balance: number,
    reason: string,
    date: Date,
    type: string
  ) {
    this.id = id;
    this.amount = amount;
    this.balance = balance;
    this.reason = reason;
    this.date = date;
    this.type = type;
  }
}
