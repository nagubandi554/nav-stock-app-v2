import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockComponent } from './components/stock/stock.component';
import { StockService } from './services/stock.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, StockComponent, SentimentComponent],
  providers: [StockService],
  bootstrap: [AppComponent],
})
export class AppModule {}
