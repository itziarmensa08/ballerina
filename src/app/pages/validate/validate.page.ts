import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.service';

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
  create_pass: boolean = false;
  user: User | undefined;

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
      this.create_pass = false;
      const token = this.route.snapshot.paramMap.get('token');
      if (token) {
        this.authService.validateUser(token).subscribe({
          next: (response) => {
            if (response.message == 'PASSWORD_TEMPORAL') {
              this.create_pass = true;
              this.user = response.user;
              localStorage.setItem('user', JSON.stringify(response.user));
            }
            this.error = false;
          },
          error: (error) => {
            this.error = true;
          }
        });
      }
      this.loading = false;
      this.create_pass = false;
    }, 3000)

  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

}
