import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { City } from '../interfaces/city';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap, tap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-location-box',
  templateUrl: './location-box.component.html',
  styleUrls: ['./location-box.component.css']
})
export class LocationBoxComponent implements OnInit {

  private searchTerms = new Subject<string>()

  showDropDown = false;

  cities$: Observable<City[]>;

  currentCity: City = {
    id: 0,
    name: '',
    coord: {
      lat: 0,
      lon: 0
    },
    country: ''
  };

  constructor(
    private _chartService: ChartService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this._chartService.getChartSubject().subscribe(chartData => {
      this.currentCity = chartData.currentCity;
    });
    this.initSearchTerm();
  }

  search(term: string): void {
    this.showDropDown = true;
    this.searchTerms.next(term);
  }

  initSearchTerm() {
    this.cities$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.searchCities(term))
    );
  }

  chooseCity(city) {
    console.log(city);
    this._chartService.changeChartCity(city);
  }

  searchCities(term: string): Observable<City[]> {
    if (!term.trim() || term.length < 3) {
      console.log('RETURN EMPTY!');
      return of([]);
    }
    return this.http.get<City[]>('../assets/city-list.json').pipe(
        map(cities => {

          const result: City[] = [];
          cities.map((city) => {
            if (city.name.toLowerCase().indexOf(term.toLowerCase()) === 0) {
              result.push(city);
            }
          });
          return result;
        })
      );
  }

  changeFocus(value) {
    switch (value) {
      case 'blur': setTimeout(() => { this.showDropDown = false; }, 100); break;
      case 'focus': setTimeout(() => { this.showDropDown = true; }, 100); break;
    }
    console.log(value);
  }

}
