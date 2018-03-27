import { Injectable } from '@angular/core';
import { ChartDataRow } from './interfaces/chart-data-row';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CHART_DATA } from './model/chart-data';
import { City } from './interfaces/city';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChartService {

  private _chartSubject = new BehaviorSubject<any>([]);

  private chart_data: ChartDataRow[] = CHART_DATA;

  private chartType = 0;

  private chartTimePeriod = {
    'from': 0,
    'to': 120
  };

  private cityId = 536203;
  private currentCity: City;

  constructor(private http: HttpClient) {
    this.changeSubject();
    this.getCityById(this.cityId);
  }

  private changeSubject() {
    this._chartSubject.next({
      'data': this.chart_data,
      'type': this.chartType,
      'timePeriod': this.chartTimePeriod,
      'currentCity': this.currentCity
    });
  }

  changeChartData(dataRow) {
    this.chart_data[dataRow.id] = dataRow;
    console.log(dataRow);
    this.changeSubject();
  }

  changeChartType(type) {
    this.chartType = type;
    this.changeSubject();
  }

  changeChartTme(newChartTimePeriod) {
    this.chartTimePeriod = newChartTimePeriod;
    this.changeSubject();
  }

  changeChartCity(newCity) {
    this.currentCity = newCity;
    this.changeSubject();
  }

  getChartSubject(): Observable<any> {
    return this._chartSubject.asObservable();
  }

  getCityById(cityId): any {
    this.http.get<City[]>('../assets/city-list.json')
      .subscribe(cities => {
        cities.map((city) => {
          if (city.id === cityId) {
            this.changeChartCity(city);
          }
        });
      });
      // .catch((error: any) => console.log(error));
  }

}
