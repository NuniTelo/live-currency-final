import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { ChartComponent } from './componetnts/chart/chart.component';
import { ChartEuLekComponent } from './componetnts/chartEuLek/chart-eu-lek/chart-eu-lek.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/chart', pathMatch: 'full'},
  {path: 'chart', component: ChartComponent},
  {path: 'chartEuLek', component: ChartEuLekComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartEuLekComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
