import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherService {

  wKey = '7fd94243b04baffdc2de94ef96864982';
  wUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=536203&appid=' + this.wKey;

  constructor(private _http: HttpClient) { }

  dailyForecast(cityId) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&appid=' + this.wKey;
    return this._http.get(url);
  }

}
