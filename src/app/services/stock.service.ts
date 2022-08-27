import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StockService {
  apiBaseEndPoint: string = 'https://finnhub.io/api/v1/';
  constructor(private http: HttpClient) {}

  getStckCompanyNames(symbol: string) {
    return this.http.get(
      `${this.apiBaseEndPoint}search?q=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getQuotesInfo(symbol: string) {
    return this.http.get(
      `${this.apiBaseEndPoint}quote?symbol=${symbol}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getSentiment(symbol: string, from: string, to: string) {
    return this.http.get(
      `${this.apiBaseEndPoint}stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=bu4f8kn48v6uehqi3cqg`
    );
  }

  getStockImage(value: number): string {
    if (value > 0) {
      return 'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/11-512.png';
    } else {
      return 'https://st2.depositphotos.com/5266903/8456/v/950/depositphotos_84568938-stock-illustration-arrow-down-flat-red-color.jpg';
    }
  }
}
