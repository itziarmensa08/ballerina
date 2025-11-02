import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-gimnast',
  templateUrl: './edit-gimnast.page.html',
  styleUrls: ['./edit-gimnast.page.scss'],
  standalone: false,
})
export class EditGimnastPage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.gimnasts', navigate: '/admin/gimnasts', icon: 'people-outline' },
    { label: 'breadcrumbs.edit_gimnast', navigate: '/admin/gimnasts/edit-gimnast', icon: 'people-outline' }
  ];

  userId: string | null = null;
  users: User[] = [];
  filteredUsers: User[] = [];

  newUser: User | null = null;

  horarisLabels = [
    'form_registration.schedule1',
    'form_registration.schedule2',
    'form_registration.schedule3',
    'form_registration.schedule4'
  ];

  selectedSchedules: boolean[] = [false, false, false, false];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private alertConfirmService: AlertConfirmService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUserData();
  }

  loadUserData() {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe(user => {
        this.newUser = user;

        const scheduleOptions = [
          { day: 'monday',   startTime: '17:30:00', endTime: '18:30:00' },
          { day: 'tuesday',  startTime: '17:30:00', endTime: '18:30:00' },
          { day: 'thursday', startTime: '17:30:00', endTime: '18:30:00' },
          { day: 'thursday', startTime: '17:30:00', endTime: '19:30:00' },
        ] as const;

        this.selectedSchedules = scheduleOptions.map(opt =>
          !!this.newUser?.schedule?.some(
            s => s.day === opt.day && s.startTime === opt.startTime && s.endTime === opt.endTime
          )
        );

        if (!this.newUser.parents || this.newUser.parents.length === 0) {
          this.newUser.parents = [{ name: '', surname: '', telephone: '' }];
        }

        if (!this.newUser.parents || this.newUser.parents.length === 1) {
          this.newUser.parents[1] = { name: '', surname: '', telephone: '' };
        }

      }, () => {
        this.alertService.showAlert('error', 'alerts.error_title', 'admin.gimnasts_edit.error_load_user');
        this.router.navigate(['/admin/gimnasts']);
      });
    }
  }

  /**
   * Actualizar un usuario existente
   */
  updateUser() {

    const scheduleTemplate = [
      { selectedIndex: 0, day: 'monday', startTime: '17:30:00', endTime: '18:30:00' },
      { selectedIndex: 1, day: 'tuesday', startTime: '17:30:00', endTime: '18:30:00' },
      { selectedIndex: 2, day: 'thursday', startTime: '17:30:00', endTime: '18:30:00' },
      { selectedIndex: 3, day: 'thursday', startTime: '17:30:00', endTime: '19:30:00' },
    ] as const;

    this.newUser!.schedule = scheduleTemplate
    .filter(s => this.selectedSchedules[s.selectedIndex])
    .map(s => ({ day: s.day, startTime: s.startTime, endTime: s.endTime }));

    this.userService.updateUser(this.newUser?._id!, this.newUser!).subscribe(updatedUser => {
      this.alertService.showAlert('success', 'admin.users_edit.updated', 'admin.users_edit.updatedMessage');
      this.router.navigate(['/admin/gimnasts']);
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.users_edit.error_update_user');
    });
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'admin.gimnasts_edit.delete');
    if (confirmed) {
      this.deleteUser();
    } 
  }

  deleteUser() {
    this.userService.deleteUser(this.newUser?._id!).subscribe(() => {
      this.alertService.showAlert('success', 'admin.users_edit.deleted', 'admin.users_edit.deletedMessage');
      this.router.navigate(['/admin/gimnasts']);
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.users_edit.error_delete_user');
    });
  }

  call() {
    if (!this.newUser?.telephone) {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.edit_gimnast.no_telephone');
      return;
    }

    // Abre el marcador con el número del usuario
    window.open(`tel:${this.newUser.telephone}`, '_system');
  }

  sendWpp() {
    if (!this.newUser?.telephone) {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.gimnasts_edit.no_telephone');
      return;
    }

    // Elimina espacios y asegura el prefijo internacional (+34 si es España, por ejemplo)
    const phone = this.newUser.telephone.replace(/\s+/g, '');
    const prefix = phone.startsWith('+') ? '' : '+34'; // ajusta el prefijo según tu país

    // Crea el enlace a WhatsApp
    const message = encodeURIComponent(this.translate.instant('admin.gimnasts_edit.wpp_message', { name: this.newUser.name }));
    const whatsappUrl = `https://wa.me/${prefix}${phone}?text=${message}`;

    window.open(whatsappUrl, '_system');
  }


}
