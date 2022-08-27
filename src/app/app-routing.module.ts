import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { StockComponent } from './components/stock/stock.component';

const stockInfoRoutes: Routes = [
  { path: '', component: StockComponent, pathMatch: 'full' },
  { path: 'sentiment/:symbol', component: SentimentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(stockInfoRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
