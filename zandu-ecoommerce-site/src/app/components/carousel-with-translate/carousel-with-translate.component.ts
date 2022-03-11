import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  transition,
  state,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'carousel-with-translate',
  templateUrl: './carousel-with-translate.component.html',
  styleUrls: ['./carousel-with-translate.component.scss'],
  animations: [
    trigger('slideAnimation', [
      state(
        'showSlide1',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'showSlide2',
        style({
          transform: 'translateX(-100%)',
        })
      ),
      state(
        'showSlide3',
        style({
          transform: 'translateX(-200%)',
        })
      ),
      state(
        'showSlide4',
        style({
          transform: 'translateX(-300%)',
        })
      ),
      transition('showSlide1 <=> showSlide2', [animate('500ms')]),
      transition('showSlide2 <=> showSlide3', [animate('500ms')]),
      transition('showSlide3 <=> showSlide4', [animate('500ms')]),
      transition('showSlide4 <=> showSlide1', [animate('500ms')]),
    ]),
  ],
})
export class CarouselWithTranslateComponent implements OnInit {
  @Input() slides: Slide[] = [];
  animationState: AnimationState = 'showSlide1';
  currentSlide = 1;

  constructor() {}

  ngOnInit(): void {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 1 ? this.slides.length - 1 : previous;

    this.setAnimationState();

    console.log('previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 1 : next;

    this.setAnimationState();

    console.log('next clicked, new current slide is: ', this.currentSlide);
  }

  setAnimationState() {
    switch (this.currentSlide) {
      case 1:
        this.animationState = 'showSlide1';
        break;
      case 2:
        this.animationState = 'showSlide2';
        break;
      case 3:
        this.animationState = 'showSlide3';
        break;
      case 4:
        this.animationState = 'showSlide4';
        break;
      default:
        this.animationState = 'showSlide1';
        break;
    }
  }
}

type AnimationState = 'showSlide1' | 'showSlide2' | 'showSlide3' | 'showSlide4';

interface Slide {
  name?: string;
  description: string;
  src: string;
}
