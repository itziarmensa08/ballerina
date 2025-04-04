import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
  standalone: false
})
export class ValidatePage implements OnInit {

  imageHeader: String = '';
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private imageService: ImagesService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.imageService.getImageByKey('login.register').subscribe(response => {
      this.imageHeader = response;
    }); 

    setTimeout(() => {
      const token = this.route.snapshot.paramMap.get('token');
      if (token) {
        this.authService.validateUser(token).subscribe({
          next: () => {
            this.error = false;
          },
          error: (error) => {
            this.error = true;
          }
        });
      }
      this.loading = false;
    }, 3000)

  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

}
