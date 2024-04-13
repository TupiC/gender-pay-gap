import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-europe',
  templateUrl: './europe.component.html',
})
export class EuropeComponent implements OnInit {
  barChart!: Chart;
  labels = ["Estonia", "Austria", "Czech Republic", "Germany", "Slovakia", "Hungary", "Latvia", "Finland", "Denmark", "France", "Bulgaria", "Netherlands", "EU-27", "Croatia", "Portugal", "Lithuania", "Sweden", "Greece", "Cyprus", "Malta", "Ireland", "Spain", "Slovenia", "Poland", "Belgium", "Romania", "Italy", "Luxembourg"];
  data = [21.3, 18.4, 17.9, 17.7, 17.7, 17.5, 17.1, 15.5, 13.9, 13.9, 13.0, 13.0, 12.7, 12.5, 12.5, 12.0, 11.1, 10.4, 10.2, 10.2, 9.3, 8.7, 8.2, 7.8, 5.0, 4.5, 4.3, -0.7];

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Gender Pay Gap EU 2022 in %',
            data: this.data,
            backgroundColor: ['rgba(96, 165, 250,1)', 'rgb(249 168 212)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)', 'rgba(96, 165, 250,1)'],
          }
        ]
      },
      options: {
        color: 'white',
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: this.getTranslation('country'),
              color: 'white'
            },
            ticks: {
              color: 'white',
              autoSkip: false
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: this.getTranslation('percent'),
              color: 'white'
            },
            ticks: { color: 'white' }
          }
        },
      }
    });
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
