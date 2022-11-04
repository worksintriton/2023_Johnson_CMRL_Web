import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsMasterComponent } from './parts-master.component';

describe('PartsMasterComponent', () => {
  let component: PartsMasterComponent;
  let fixture: ComponentFixture<PartsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
