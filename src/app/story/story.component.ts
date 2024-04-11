import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
})
export class StoryComponent {
  currentLanguage = this.translationService.currentLanguage

  constructor(private translationService: TranslationService) { }

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
