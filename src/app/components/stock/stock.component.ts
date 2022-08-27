import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CompanyNames,
  Quote,
  StckInfo,
  StockInfo,
  Stocks,
} from '../../model/stock';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit, OnDestroy {
  stockTrackerFormGroup: FormGroup;
  stockData: StockInfo[] = [];
  stockList: Stocks[] = [];
  quoteData = [];
  companyNames: CompanyNames;
  quotes: Quote;
  subscriptionData$: Subscription = new Subscription();
  loading: boolean = false;

  constructor(private readonly stockService: StockService) {}

  ngOnInit(): void {
    this.createStockForm();
    this.getStocks();
  }

  ngOnDestroy(): void {
    this.subscriptionData$.unsubscribe();
  }

  createStockForm(): void {
    this.stockTrackerFormGroup = new FormGroup({
      symbol: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
      ]),
    });
  }

  getStocks(): void {
    const stocks = localStorage.getItem('stockData');
    this.stockList = stocks ? JSON.parse(stocks) : [];
    this.stockData = this.stockList;
  }

  stockFormSubmit(): void {
    this.getStckCompanyNames();
  }

  getStckCompanyNames(): void {
    this.loading = true;
    const { symbol } = this.stockTrackerFormGroup.value;
    this.subscriptionData$.add(
      combineLatest({
        companyNames: this.stockService.getStckCompanyNames(symbol),
        quotes: this.stockService.getQuotesInfo(symbol),
      })
        .pipe(
          map((response: StckInfo) => {
            this.companyNames = response?.companyNames;
            this.quotes = response?.quotes;
            const list = {
              description: this.companyNames.result[0].description,
              symbol: this.companyNames.result[0].symbol,
            };
            this.stockData.push(list);
            this.quoteData.push(this.quotes);
            this.setQuotes();
          })
        )
        .subscribe()
    );
  }

  setQuotes(): void {
    this.stockData.map((element, i) => {
      this.stockList[i] = {
        description: this.stockData[i].description,
        symbol: this.stockData[i].symbol,
        d: this.quoteData[i]?.d,
        c: this.quoteData[i]?.c,
        o: this.quoteData[i]?.o,
        h: this.quoteData[i]?.h,
      };
    });
    localStorage.setItem('stockData', JSON.stringify(this.stockList));
    this.resetForm();
    this.loading = false;
  }

  resetForm(): void {
    this.stockTrackerFormGroup.reset();
  }

  removeStock(indx: number): void {
    this.stockList.splice(indx, 1);
    this.stockData = this.stockList;
    localStorage.setItem('stockData', JSON.stringify(this.stockList));
  }
}
