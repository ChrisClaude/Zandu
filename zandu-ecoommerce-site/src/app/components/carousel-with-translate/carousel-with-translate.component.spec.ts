import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWithTranslateComponent } from './carousel-with-translate.component';

describe('CarouselWithTranslateComponent', () => {
  let component: CarouselWithTranslateComponent;
  let fixture: ComponentFixture<CarouselWithTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselWithTranslateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWithTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
