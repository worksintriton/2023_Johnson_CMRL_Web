import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMaintenanceDataComponent } from './upload-maintenance-data.component';

describe('UploadMaintenanceDataComponent', () => {
  let component: UploadMaintenanceDataComponent;
  let fixture: ComponentFixture<UploadMaintenanceDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMaintenanceDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMaintenanceDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
