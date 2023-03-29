import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAreaComponent } from './control-area.component';

describe('ControlAreaComponent', () => {
  let component: ControlAreaComponent;
  let fixture: ComponentFixture<ControlAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
