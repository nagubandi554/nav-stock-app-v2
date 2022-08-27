import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { months } from '../../config/months-constant';
import { Sentiment, SentimentInfo } from '../../model/sentiment';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit, OnDestroy {
  sentimentData: Sentiment[] = [];
  symbol: string;
  fromDate: string;
  toDate: string;
  symbolName: string;
  loading: boolean = false;
  subscription$: Subscription = new Subscription();

  constructor(
    private readonly stockService: StockService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol');
    this.getSentimentDateDetails();
    this.getSentiment();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  getSentimentDateDetails(): void {
    const todayDate = new Date().toISOString().slice(0, 10);
    const d = new Date(todayDate);
    d.setMonth(d.getMonth() - 3);
    this.toDate = todayDate;
    this.fromDate = d.toISOString().slice(0, 10);
  }

  getSentiment(): void {
    this.loading = true;
    this.subscription$.add(
      this.stockService
        .getSentiment(this.symbol, this.fromDate, this.toDate)
        .subscribe((res: SentimentInfo) => {
          this.sentimentData = res.data;
          this.symbolName = res.symbol;
          this.loading = false;
        })
    );
  }

  getMonthDetails(num: number): string {
    return months[num - 1].toUpperCase();
  }

  getStockImage(value: number): string {
    return this.stockService.getStockImage(value);
  }
}
