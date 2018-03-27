import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-settings-box',
  templateUrl: './settings-box.component.html',
  styleUrls: ['./settings-box.component.css']
})
export class SettingsBoxComponent implements OnInit {

  displayedColumns = ['name', 'usage', 'fill', 'thickness', 'color'];
  dataSource = new MatTableDataSource([]);
  showSettings = false;
  showFill = true;

  constructor(public _chartService: ChartService) {
    this._chartService.getChartSubject().subscribe(chartData => {
      this.dataSource = new MatTableDataSource(chartData.data);
      this.showFill = chartData.type !== 1;
    });
  }

  ngOnInit() {}

  changeChartData(item, key, newValue) {
    item[key] = newValue;
    // item['usage'] = true;
    this._chartService.changeChartData(item);
  }

  changeSettingsShowStatus() {
    this.showSettings = !this.showSettings;
  }

  changeThickness(item, key, newValue) {
    console.log(newValue);
  }
}
