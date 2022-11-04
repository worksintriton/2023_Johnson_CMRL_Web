import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartsMasterComponent } from './add-parts-master.component';

describe('AddPartsMasterComponent', () => {
  let component: AddPartsMasterComponent;
  let fixture: ComponentFixture<AddPartsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
