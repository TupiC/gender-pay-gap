import { Component, OnInit } from '@angular/core';
import Chart, { ChartEvent, LegendItem } from 'chart.js/auto';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {

  displayExtendedData = false;
  lineChart!: Chart;
  extendedLabels = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050", "2051", "2052", "2053", "2054", "2055", "2056", "2057", "2058", "2059", "2060", "2061", "2062"]
  labels = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];
  data = [23.5, 22.9, 22.3, 22.2, 21.8, 20.8, 20.7, 20.4, 19.9, 18.9, 18.8, 18.4];
  extendedRegressionData = [23.44545454545448, 22.978181818181838, 22.51090909090908, 22.043636363636324, 21.576363636363567, 21.109090909090924, 20.641818181818167, 20.17454545454541, 19.707272727272652, 19.24000000000001, 18.772727272727252, 18.305454545454495, 17.838181818181738, 17.370909090909095, 16.903636363636338, 16.43636363636358, 15.969090909090937, 15.50181818181818, 15.034545454545423, 14.567272727272666, 14.100000000000023, 13.632727272727266, 13.165454545454509, 12.698181818181752, 12.230909090909108, 11.763636363636351, 11.296363636363594, 10.829090909090837, 10.361818181818194, 9.894545454545437, 9.42727272727268, 8.959999999999923, 8.49272727272728, 8.025454545454522, 7.558181818181765, 7.090909090909008, 6.623636363636365, 6.156363636363608, 5.689090909090851, 5.2218181818182074, 4.75454545454545, 4.287272727272693, 3.8199999999999363, 3.352727272727293, 2.885454545454536, 2.418181818181779, 1.9509090909090219, 1.4836363636363785, 1.0163636363636215, 0.5490909090908644, 0.0818181818181074, -0.38545454545453595]

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Gender Pay Gap 2011–2022 in %',
            data: this.data,
            fill: false,
            borderColor: 'rgb(96, 165, 250)',
            tension: 0.1,
            cubicInterpolationMode: 'default'
          },
          {
            label: this.getTranslation('expectedGenderPayGapClosure'),
            data: this.extendedRegressionData,
            fill: false,
            hidden: true,
            borderColor: 'rgb(249 168 212)',
            borderDash: [5, 5],
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            onClick: (e: ChartEvent, legendItem: LegendItem, legend: any) => {
              console.log(legendItem)
              if (legendItem.text === this.getTranslation('expectedGenderPayGapClosure')) {
                this.toggleExtendedData()
              }
            }
          }
        },
        color: 'white',
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: this.getTranslation('year'),
              color: 'white'
            },
            ticks: { color: 'white' }
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

  toggleExtendedData() {
    this.displayExtendedData = !this.displayExtendedData;
    this.lineChart.data.xLabels = this.displayExtendedData ? this.extendedLabels : this.labels;
    this.lineChart.data.datasets[1].hidden = !this.displayExtendedData;
    this.lineChart.update();
  }


  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }
}
