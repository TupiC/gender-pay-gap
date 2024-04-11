import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {
    en: {
      genderEquality: "Gender Equality Matters",
      austria: "Austria",
      women: "women",
      earnGrossly: "earn grossly",
      lessPerHourThan: "less per hour than",
      men: "men",
    },
    de: {
      genderEquality: "Gender Equality Matters",
      austria: "Österreich verdienen",
      women: "Frauen",
      earnGrossly: "brutto um",
      lessPerHourThan: "weniger pro Stunde als",
      men: "Männer"
    },
  };

  constructor() { }

  getTranslation(lang: string, key: string): string {
    return this.translations[lang]?.[key] || key
  }
}
