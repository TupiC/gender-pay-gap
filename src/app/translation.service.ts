import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentLanguage: string = 'en';

  private translations: any = {
    en: {
      genderEquality: "Gender Equality Matters",
      austria: "Austria",
      women: "women",
      earnGrossly: "earn grossly",
      lessPerHourThan: "less per hour than",
      men: "men",
      euComparison: "In comparison with the EU, Austria continues to be one of the countries with the largest gender-specific wage differences and is significantly above the EU average of 12.7%.",
      chartDescription: "The gender pay gap in Austria is on a promising downward trend, with data from 2011 to 2022 showing a decrease from 23.5% to 18.4%. By calculating the regression of the current trend we can see that the gender pay gap could be closed by 2062. This is still a long way off, but it is a step in a better economical equality.",
      hideRegression: "Hide Regression",
      showRegression: "Show Regression",
      europeText: "With a gender pay gap of 18.4%, Austria stands above the EU-27 average of 12.7%. This statistic places Austria among the countries with higher gender pay disparities in the European Union.",
      aroundTheWorld: "Around The World",
      globeDescription: "The globe represents the Gender Gap Index across countries. Each nation is colored based on its progress towards gender equality. The darker the shade of blue, the closer the country is to achieving full gender equality.",
      indexDescription: "The Gender Gap Index is a metric that evaluates the disparity between men and women across various sectors such as economic participation, education, health, and political empowerment.",
      expectedGenderPayGapClosure: "Expected Gender Pay Gap Closure",
      year: "Year",
      percent: "Percent",
      country: "Country",
      projectBy: "Project by",
    },
    de: {
      genderEquality: "Geschlechtergleichheit ist wichtig",
      austria: "Österreich verdienen",
      women: "Frauen",
      earnGrossly: "brutto um",
      lessPerHourThan: "weniger pro Stunde als",
      men: "Männer",
      euComparison: "Im Vergleich zur EU bleibt Österreich weiterhin eines der Länder mit den größten geschlechtsspezifischen Lohnunterschieden und liegt deutlich über dem EU-Durchschnitt von 12,7%.",
      chartDescription: "Der Gender Pay Gap in Österreich befindet sich in einem vielversprechenden Abwärtstrend, wobei die Daten von 2011 bis 2022 einen Rückgang von 23,5% auf 18,4% zeigen. Durch die Berechnung der Regression des aktuellen Trends können wir sehen, dass der Gender Pay Gap bis 2062 geschlossen werden könnte. Dies ist noch ein langer Weg, aber es ist ein Schritt in Richtung einer besseren wirtschaftlichen Gleichheit.",
      hideRegression: "Regression Verbergen",
      showRegression: "Regression Anzeigen",
      europeText: "Mit einem Gender Pay Gap von 18,4% liegt Österreich über dem EU-27-Durchschnitt von 12,7%. Diese Statistik platziert Österreich unter den Ländern mit höheren geschlechtsspezifischen Lohnunterschieden in der Europäischen Union.",
      aroundTheWorld: "Rund um die Welt",
      globeDescription: "Der Globus repräsentiert den Gender Gap Index in verschiedenen Ländern. Jede Nation ist basierend auf ihrem Fortschritt in Richtung Geschlechtergleichstellung eingefärbt. Je dunkler der Blauton, desto näher ist das Land an der vollständigen Geschlechtergleichstellung.",
      indexDescription: "Der Gender Gap Index ist eine Metrik, die die Abweichung zwischen Männern und Frauen in verschiedenen Bereichen wie wirtschaftlicher Teilhabe, Bildung, Gesundheit und politischer Beteiligung bewertet.",
      expectedGenderPayGapClosure: "Erwarteter Gender Pay Gap-Schluss",
      year: "Jahr",
      percent: "Prozent",
      country: "Land",
      projectBy: "Projekt von",
    },
  };

  constructor() { }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  isLanguageSelected(lang: string): boolean {
    return this.currentLanguage === lang;
  }
  getTranslation(key: string): string {
    return this.translations[this.currentLanguage]?.[key] || key
  }
}
