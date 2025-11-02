import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { ImagesService } from 'src/app/services/images.service';
import { UserService } from 'src/app/services/user.service';
import { Visit, VisitService } from 'src/app/services/visits.service';

Chart.register(...registerables);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit, AfterViewInit {

  lang: string = '';
  imageHeader: String = '';
  visits: Visit[] = [];

  totalUsers: number = 0;
  totalAdmins: number = 0;
  totalGimnasts: number = 0;

  @ViewChild('barChartCanvas') barChartCanvas: any;
  barChart: any;

  ngAfterViewInit() {
    this.createBarChart();
  }

  constructor(
    private translate: TranslateService,
    private imageService: ImagesService,
    private authService: AuthService,
    private visitService: VisitService,
    private usersService: UserService
  ) { }

  ngOnInit() {
    this.lang = this.translate.currentLang || 'es';

    this.imageService.getImageByKey('admin.header').subscribe(response => {
      this.imageHeader = response;
    }); 

    this.loadVisits();
    this.countByRole();
  }

  loadVisits() {
    this.visitService.getVisits().subscribe({
      next: (data) => {
        this.visits = data;
        this.createBarChart();
      },
      error: (err) => console.error('Error loading visits:', err)
    });
  }

  countByRole() {
    this.usersService.countByRoleUsers().subscribe(response => {
      this.totalUsers = response.user;
      this.totalAdmins = response.admin;
      this.totalGimnasts = response.gimnast;
    });
  }

  createBarChart() {
    if (!this.visits.length) return;

    // Ordenar por fecha (por si acaso)
    this.visits.sort((a, b) => a.date.localeCompare(b.date));

    const labels = this.visits.map(v => v.date);
    const counts = this.visits.map(v => v.count);

    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: this.translate.instant('admin.visits_per_day') || 'Visitas por día',
            data: counts,
            backgroundColor: 'rgba(0, 123, 255, 0.7)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            borderRadius: 6,
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
              label: (tooltipItem) => `${tooltipItem.raw} visitas`,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            ticks: {
              color: '#333',
              font: { size: 12 }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              color: '#333',
              callback: (value) => `${value}`,
            },
          },
        },
      },
    });
  }

  logout() {
    this.authService.logout();
  }

}
