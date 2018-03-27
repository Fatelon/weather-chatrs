import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-settings-global-box',
  templateUrl: './settings-global-box.component.html',
  styleUrls: ['./settings-global-box.component.css']
})
export class SettingsGlobalBoxComponent implements OnInit {

  chartTimePeriod = {
    'from': 0,
    'to': 120
  };

  constructor(public _chartService: ChartService) { }

  ngOnInit() {
    this._chartService.getChartSubject().subscribe(chartData => {
      this.chartTimePeriod = chartData.timePeriod;
    });
  }

  changeTimeRange(timeSlider) {
    this._chartService.changeChartTme({
      'from': this.chartTimePeriod.from,
      'to': timeSlider
    });
  }

}
