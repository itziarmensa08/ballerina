import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit, AfterViewInit {

  lang: string = '';

  @ViewChild('barChartCanvas') barChartCanvas: any;
  barChart: any;

  ngAfterViewInit() {
    this.createBarChart();
  }

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.lang = this.translate.currentLang || 'es';
  }

  createBarChart() {
    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        datasets: [
          {
            label: 'Hours Activity',
            data: [3, 5, 2, 6.75, 4, 1, 5],
            backgroundColor: [
              'black', 'black', 'black', 'lightgreen', 'black', 'black', 'black'
            ],
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem: any) {
                return `${tooltipItem.raw}h`;
              },
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 8,
            ticks: {
              stepSize: 2,
              callback: (value) => `${value}h`,
            },
          },
        },
      },
    });
  }

}
