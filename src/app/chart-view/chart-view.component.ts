import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ChartService } from '../chart.service';
import { Chart } from 'chart.js';
import { ChartDataRow } from '../interfaces/chart-data-row';
import { hexToRgbA } from '../utils';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css']
})

export class ChartViewComponent implements OnInit {

  chartData: ChartDataRow[] = [];
  chartType = 0;
  currentCityId = 0;
  chartTypesArray = ['line', 'bar', 'radar'];
  chart: any = [];
  chartIsInit = false;
  weatherList = [];
  chartTimePeriod = {
    'from': 0,
    'to': 0
  };

  constructor(
    private _weather: WeatherService,
    private _chartService: ChartService
  ) { }

  ngOnInit() {
    // this.getWeatherData();
    this.getChartSubscription();
  }

  getChartSubscription() {
    this._chartService.getChartSubject()
      .subscribe(chartData => {
        this.chartData = chartData.data;
        this.chartTimePeriod = chartData.timePeriod;
        if (this.chartType !== chartData.type) {
          this.chartType = chartData.type;
          this.recreateChart();
        }
        if (chartData && chartData.currentCity && this.currentCityId !== chartData.currentCity.id) {
          this.getWeatherData(chartData.currentCity.id);
          this.currentCityId = chartData.currentCity.id;
        }
        this.updateChart();
      });
  }

  recreateChart() {
    if (this.chart.destroy) {
      this.chart.destroy();
      this.chart = undefined;
    }
    this.initChart();
  }

  getWeatherData(cityId) {
    console.log('change WeatherData');
    this._weather.dailyForecast(cityId).subscribe(res => {
      console.log(res);
      this.weatherList = res['list'];
      this.chartIsInit = true;
      this.recreateChart();
      this.updateChart();
    });
  }

  updateChart() {
    if (this.chartIsInit && this.chart) {
      const weatherDates = [];
      const from = this.weatherList[0].dt * 1000 + this.chartTimePeriod.from * 60 * 60 * 1000;
      const to = this.weatherList[0].dt * 1000 + this.chartTimePeriod.to * 60 * 60 * 1000;
      const alldates = this.weatherList.map(listItem => listItem.dt);
      let startIndex = -1;
      let endIndex = -1;
      alldates.forEach((date, index) => {
        if (from <= date * 1000 && date * 1000 <= to) {
          if (startIndex === -1) {
            startIndex = index;
          } else {
            endIndex = index;
          }
          const jsdate = new Date(date * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { month: 'short', day: 'numeric' }));
        }
      });
      const datasets = [];
      if (startIndex >= 0 && endIndex > startIndex) {
        this.chartData.map((chartDataRow: ChartDataRow) => {
          if (chartDataRow.usage) {
            const data = [];
            for (let i = startIndex; i <= endIndex; i++) {
              if (!this.weatherList[i].main) { continue; }
              switch (chartDataRow.id) {
                case 0: data.push(this.weatherList[i].main.temp_max); break;
                case 1: data.push(this.weatherList[i].main.temp_min); break;
                case 2: data.push(this.weatherList[i].main.pressure); break;
                case 3: data.push(this.weatherList[i].main.sea_level); break;
                case 4: data.push(this.weatherList[i].main.humidity); break;
                case 5: data.push(this.weatherList[i].wind.speed); break;
                case 6: data.push(this.weatherList[i].wind.deg); break;
              }
            }
            datasets.push({
              label: chartDataRow.name,
              data: data,
              borderColor: chartDataRow.color,
              fill: chartDataRow.fill,
              backgroundColor: hexToRgbA(chartDataRow.color, 0.2),
              borderWidth: chartDataRow.thickness
            });
          }
        });
      }
      this.chart.data.datasets = datasets;
      this.chart.data.labels = weatherDates;
      this.chart.type = 'bar';
      this.chart.update();
    }
  }

  initChart() {
    this.chart = new Chart('chartCanvas', {
      type: this.chartTypesArray[this.chartType],
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: this.chartTypesArray[this.chartType].toUpperCase() + ' CHART',
          fontFamily: 'Georgia, serif',
          padding: 15,
          fontSize: 24
        }
      }
    });
  }

  onArrowClick(value) {
    const chartType = (this.chartType + this.chartTypesArray.length + value) % this.chartTypesArray.length;
    this._chartService.changeChartType(chartType);
  }
}
