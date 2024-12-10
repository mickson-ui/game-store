import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSignupComponent } from './game-signup.component';

describe('GameSignupComponent', () => {
  let component: GameSignupComponent;
  let fixture: ComponentFixture<GameSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
