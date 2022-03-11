import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  AnimationType,
  scaleIn,
  scaleOut,
  fadeIn,
  fadeOut,
  flipIn,
  flipOut,
  jackIn,
  jackOut,
} from './carousel.animations';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } }),
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } }),
      ]),

      /* fade */
      transition('void => fade', [
        useAnimation(fadeIn, { params: { time: '500ms' } }),
      ]),
      transition('fade => void', [
        useAnimation(fadeOut, { params: { time: '500ms' } }),
      ]),

      /* flip */
      transition('void => flip', [
        useAnimation(flipIn, { params: { time: '500ms' } }),
      ]),
      transition('flip => void', [
        useAnimation(flipOut, { params: { time: '500ms' } }),
      ]),

      /* JackInTheBox */
      transition('void => jackInTheBox', [
        useAnimation(jackIn, { params: { time: '700ms' } }),
      ]),
      transition('jackInTheBox => void', [
        useAnimation(jackOut, { params: { time: '700ms' } }),
      ]),
    ]),
  ],
})
export class CarouselComponent implements OnInit {
  @Input() slides: Slide[] = [];
  @Input() animationType = AnimationType.Fade;

  currentSlide = 0;

  constructor() {}

  ngOnInit(): void {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }
}

export interface Slide {
  name?: string;
  description: string;
  src: string;
}
