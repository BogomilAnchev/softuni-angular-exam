import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigaionComponent } from './navigaion.component';

describe('NavigaionComponent', () => {
  let component: NavigaionComponent;
  let fixture: ComponentFixture<NavigaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigaionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
