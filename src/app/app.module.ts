import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SettingsBoxComponent } from './settings-box/settings-box.component';
import { ChartService } from './chart.service';
import { WeatherService } from './weather.service';
import { MatTableModule, MatCheckboxModule, MatIconModule, MatSelectModule, MatSliderModule } from '@angular/material';
import { ChartViewComponent } from './chart-view/chart-view.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsGlobalBoxComponent } from './settings-global-box/settings-global-box.component';
import { LocationBoxComponent } from './location-box/location-box.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsBoxComponent,
    ChartViewComponent,
    SettingsGlobalBoxComponent,
    LocationBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    BrowserAnimationsModule
  ],
  providers: [
    WeatherService,
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
