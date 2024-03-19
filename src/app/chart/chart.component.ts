import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {

  ngOnInit(): void {
    const labels = ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
    const data = [23.5, 22.9, 22.3, 22.2, 21.8, 20.8, 20.7, 20.4, 19.9, 18.9, 18.8]

    const xValues = labels.map(label => Number(label));

    const mean = (arr: any[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const linearRegression = (x: any, y: any) => {
      const xMean = mean(x);
      const yMean = mean(y);
      const numerator = x.reduce((acc: number, xVal: number, i: string | number) => acc + (xVal - xMean) * (y[i] - yMean), 0);
      const denominator = x.reduce((acc: number, xVal: number) => acc + (xVal - xMean) ** 2, 0);
      const slope = numerator / denominator;
      const intercept = yMean - slope * xMean;

      return { slope, intercept };
    };

    const { slope, intercept } = linearRegression(xValues, data);

    const regressionData = xValues.map(x => slope * x + intercept);

    const lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Gender Pay Gap 2011–2021 in %',
            data: data,
            fill: false,
            borderColor: 'rgb(96, 165, 250)',
            tension: 0.1,
            cubicInterpolationMode: 'default'
          },
          {
            label: 'Expected Gender Pay Gap',
            data: [...regressionData],
            fill: false,
            borderColor: 'rgba(255, 99, 132,0.5)',
            borderDash: [5, 5],
            hidden: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Percent'
            }
          }
        }
      }
    });
  }
}
