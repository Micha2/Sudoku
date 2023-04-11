import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscorelistComponent } from './highscorelist.component';

describe('HighscorelistComponent', () => {
  let component: HighscorelistComponent;
  let fixture: ComponentFixture<HighscorelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighscorelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighscorelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
