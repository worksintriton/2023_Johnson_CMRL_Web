import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartsMasterComponent } from './edit-parts-master.component';

describe('EditPartsMasterComponent', () => {
  let component: EditPartsMasterComponent;
  let fixture: ComponentFixture<EditPartsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
