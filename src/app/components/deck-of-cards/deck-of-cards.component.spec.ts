import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckOfCardsComponent } from './deck-of-cards.component';

describe('DeckOfCardsComponent', () => {
  let component: DeckOfCardsComponent;
  let fixture: ComponentFixture<DeckOfCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckOfCardsComponent]
    });
    fixture = TestBed.createComponent(DeckOfCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
