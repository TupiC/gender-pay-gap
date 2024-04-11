import { Component, Input, OnInit } from '@angular/core';
import { CountUp } from 'countup.js';
import { CountUpOptions } from 'countup.js';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export default class HeroComponent implements OnInit {
  options!: CountUpOptions;

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    this.options = {
      decimalPlaces: 1,
      suffix: '%',
      duration: 2,
    };
    setTimeout(() => {
      let demo = new CountUp('myTargetElement', 18.4, this.options);
      if (!demo.error) {
        demo.start();
      } else {
        console.error(demo.error);
      }
    }, 3000);
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  changeLanguage(lang: string) {
    this.translationService.changeLanguage(lang);
  }

  isLanguageSelected(lang: string) {
    return this.translationService.isLanguageSelected(lang);
  }
}
