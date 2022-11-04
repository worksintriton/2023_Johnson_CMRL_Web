import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPartsMasterDetailsComponent } from './add-edit-parts-master-details.component';

describe('AddEditPartsMasterDetailsComponent', () => {
  let component: AddEditPartsMasterDetailsComponent;
  let fixture: ComponentFixture<AddEditPartsMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPartsMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPartsMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
