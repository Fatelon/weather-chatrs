import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGlobalBoxComponent } from './settings-global-box.component';

describe('SettingsGlobalBoxComponent', () => {
  let component: SettingsGlobalBoxComponent;
  let fixture: ComponentFixture<SettingsGlobalBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsGlobalBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsGlobalBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
