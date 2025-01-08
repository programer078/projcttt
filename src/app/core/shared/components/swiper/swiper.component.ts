import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Img1Component } from "../img1/img1.component";

import { ImageItem } from 'src/app/core/Interfaces/image-item.interface';

@Component({
  selector: 'app-swiper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
  imports: [Img1Component],
})
export class SwiperComponent implements OnInit {
  private mainSwiper: any;
  private thumbsSwiper: any;

  public ind1: ImageItem[] = [
    { img: 'assets/imgs/nature-1.jpg' },
    { img: 'assets/imgs/nature-2.jpg' },
    { img: 'assets/imgs/nature-3.jpg' },
    { img: 'assets/imgs/nature-4.jpg' },
    { img: 'assets/imgs/nature-5.jpg' }
  ];
  public ngOnInit(): void {
    setTimeout(() => {
      this.initializeSwipers();
    });
  }

  private initializeSwipers(): void {
    const savedIndex = localStorage.getItem('swiperIndex');
    const mainElement = document.querySelector('.mySwiper');
    if (mainElement) {
      this.mainSwiper = (mainElement as any).swiper;
      if (savedIndex) {
        this.mainSwiper.slideTo(parseInt(savedIndex));
      }
      this.mainSwiper.on('slideChange', () => {
        localStorage.setItem('swiperIndex', this.mainSwiper.activeIndex.toString());
      });
    }
    const thumbsElement = document.querySelector('.mySwiper2');
    if (thumbsElement) {
      this.thumbsSwiper = (thumbsElement as any).swiper;
      if (savedIndex) {
        this.thumbsSwiper.slideTo(parseInt(savedIndex));
      }
    }
  }

  public clearSavedPosition(): void {
    localStorage.removeItem('swiperIndex');
    this.mainSwiper?.slideTo(0);
    this.thumbsSwiper?.slideTo(0);
  }
}