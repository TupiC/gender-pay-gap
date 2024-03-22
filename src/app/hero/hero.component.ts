import { Component } from '@angular/core';
import { CountUp } from 'countup.js';
import { CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  options!: CountUpOptions;

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
}
