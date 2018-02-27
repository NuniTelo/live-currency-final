import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import {Chart} from 'chart.js';
import {Observable} from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
   chart: Chart;

   private value = [];
   private serviceUrl = 'https://ourcurrency.herokuapp.com/getdata?first_currency=USD&second_currency=LEK';
   private getLastUrl = 'https://ourcurrency.herokuapp.com/getlast?first_currency=USD&second_currency=LEK';
   mydata = Array<any>();
   myLabel = Array<any>();
   vleraFundit: DoubleRange;
   balance = 10000;
   betValue = 100;
   vlera: any;
   vlFinale: number;
   vleraTwo: any;
   vleraFinaleTwo: number;
   koha = 5000;
   pointSizeDefault = 4;
   obj: Object;
   pointSize = [];
   lastBet: string;
   colorPoints = [];
   buyColor = '#4EC549';
   sellColor = '#B22222';
   normalColor = '#E5E5E5';
   private unsubscribe: Subject<void> = new Subject();


  constructor(private http: HttpClient ) {
    this.getdata();
   }

   createChart() {
      // this.test();
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.myLabel,
          datasets: [
            {
              data: this.mydata,
              borderColor: '#3e95cd',
              fill: true,
              label: 'USD/LEK',
              pointRadius: this.pointSize,
              tension: 0,
              pointBackgroundColor : this.colorPoints
            },
            // {
            //   data: this.listaMin,
            //   borderColor: '#ffcc00',
            //   fill: true
            // },
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              ticks: {
                stepSize: 2
            },
              display: true
            }]
          }
        }
      });
   }

   getdata() {
    this.http.get(this.serviceUrl).subscribe(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          this.mydata.push(data[key].value);
          this.myLabel.push(data[key].updateDate);
          // this.myLabel.push(data[key].value);
          // ketu e mbushim per ne fillim
          this.pointSize.push(3);
          // per ngjyren
          this.colorPoints.push(this.normalColor);
        }
      }
      this.createChart();
       console.log(this.mydata.length);
       console.log('req data: ' + this.mydata.length );

    });
   }

   getLast() {
    Observable.interval(1000).takeUntil(this.unsubscribe).subscribe(x => {
      this.http.get(this.getLastUrl).subscribe(data => {
        console.log(data['value']);
      if (this.mydata.length > 50 && this.myLabel.length > 50) {
        this.mydata.shift();
        this.myLabel.shift();
        this.mydata.push(data['value']);
        this.myLabel.push(data['updateDate']);
       // this.myLabel.push(data['value']);
        this.pointSize.push(3);
        this.pointSize.shift();
        // ngjyrat
        this.colorPoints.push(this.normalColor);
        this.colorPoints.shift();
        this.chart.update();
        } else {
          this.mydata.push(data['value']);
          this.myLabel.push(data['updateDate']);
          // this.myLabel.push(data['value']);
          this.pointSize.push(3);
          this.colorPoints.push(this.normalColor);
          this.chart.update();
        }
   });
    });
}

shtoPara() {
  this.betValue += 100;
}

zbritPara() {
  this.betValue -= 100;
}

buy() {
 if (this.balance > this.betValue) {
  this.lastBet = 'U vendosen ' + this.betValue + '$';
   this.vlera = this.mydata[this.mydata.length - 1];
   this.vlFinale = parseInt(this.vlera, 10);
   // per piken e fundit te ndyshoje radius
   this.pointSize[this.pointSize.length - 1 ] = 10;
   this.colorPoints[this.colorPoints.length - 1 ] = this.buyColor;

   Observable.timer(this.koha).subscribe(x => {
     this.vleraTwo = this.mydata[this.mydata.length - 1];
     this.vleraFinaleTwo = parseInt(this.vleraTwo, 10);
     this.pointSize[this.pointSize.length - 1] = 10;
     this.colorPoints[this.colorPoints.length - 1 ] = this.buyColor;
     this.chart.update();
    if (this.vleraFinaleTwo > this.vlFinale) {
      this.lastBet = 'Fitore me ' + this.betValue + '$';
      console.log('Vlera e dyte me e madhe se vlera e pare! ' + this.vleraFinaleTwo + ' ' + this.vlFinale);
      this.balance += this.betValue;
      this.chart.update();
    } else {
      this.lastBet = 'Humbje me ' + this.betValue + '$ :(';
      console.log('E kunderta!');
      this.balance -= this.betValue;
      this.chart.update();
    }
  });
 }
}

sell () {
  if (this.balance > this.betValue) {
    this.lastBet = 'U vendosen ' + this.betValue + '$';
     this.vlera = this.mydata[this.mydata.length - 1];
     this.vlFinale = parseInt(this.vlera, 10);
     // per piken e fundit te ndyshoje radius
     this.pointSize[this.pointSize.length - 1 ] = 10;
     this.colorPoints[this.colorPoints.length - 1 ] = this.sellColor;
     Observable.timer(this.koha).subscribe(x => {
       this.vleraTwo = this.mydata[this.mydata.length - 1];
       this.vleraFinaleTwo = parseInt(this.vleraTwo, 10);
       this.pointSize[this.pointSize.length - 1] = 10;
       this.colorPoints[this.colorPoints.length - 1 ] = this.sellColor;
       this.chart.update();
      if (this.vleraFinaleTwo < this.vlFinale) {
        this.lastBet = 'Fitore me ' + this.betValue + '$';
        console.log('Vlera e dyte me e madhe se vlera e pare! ' + this.vleraFinaleTwo + ' ' + this.vlFinale);
        this.balance += this.betValue;
        this.chart.update();
      } else {
        this.lastBet = 'Humbje me ' + this.betValue + '$ :(';
        console.log('E kunderta!');
        this.balance -= this.betValue;
        this.chart.update();
      }
    });
   }

}

  ngOnInit() {
    this.getLast();
  }

 ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }



}

