import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdCarouselBasicComponent } from './ngbd-carousel-basic.component';

describe('NgbdCarouselBasicComponent', () => {
  let component: NgbdCarouselBasicComponent;
  let fixture: ComponentFixture<NgbdCarouselBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdCarouselBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdCarouselBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
