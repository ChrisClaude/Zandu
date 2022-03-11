import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveXComponent } from './reactive-x.component';

describe('ReactiveXComponent', () => {
  let component: ReactiveXComponent;
  let fixture: ComponentFixture<ReactiveXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
