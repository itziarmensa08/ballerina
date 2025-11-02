import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gimnasts',
  templateUrl: './gimnasts.page.html',
  styleUrls: ['./gimnasts.page.scss'],
  standalone: false,
})
export class GimnastsPage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.gimnasts', navigate: '/admin/gimnasts', icon: 'people-outline' }
  ];

  users: User[] = [];
  filteredUsers: User[] = [];

  newUser: User | null = null;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ionViewWillEnter() {
    this.loadUsers();
  }

  /**
   * Cargar todos los usuarios desde la API
   */
  loadUsers() {
    this.userService.getAllGimnasts().subscribe(response => {
      this.users = response;
      this.filteredUsers = response;
    });
  }

  /**
   * Filtrar usuarios en la barra de búsqueda
   * @param event - Evento del ion-searchbar
   */
  filterUsers(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    
    if (!searchTerm) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.surname.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) 
    );
  }

  /**
   * Reiniciar el formulario de nuevo usuario
   */
  resetForm() {
    this.newUser = null;
  }

  /**
   * Actualizar un usuario existente
   */
  updateUser() {
    this.userService.updateUser(this.newUser?._id!, this.newUser!).subscribe(updatedUser => {
      this.loadUsers();
      this.alertService.showAlert('success', 'admin.users_edit.updated', 'admin.users_edit.updatedMessage');
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.users_edit.error_update_user');
      this.resetForm();
    });
  }

  toggleEditUser(id: string | undefined) {
    this.router.navigate(['/admin/gimnasts/edit-gimnast', id]);
  }

}
