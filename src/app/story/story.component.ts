import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
})
export class StoryComponent {
  currentLanguage = this.translationService.currentLanguage
  isMobile = window.innerWidth < 1024;

  constructor(private translationService: TranslationService) { }

  ngOnInit() {
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 1024;
    }
    );
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
