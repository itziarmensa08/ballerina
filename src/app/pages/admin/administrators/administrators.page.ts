import { Component, OnInit } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.page.html',
  styleUrls: ['./administrators.page.scss'],
  standalone: false,
})
export class AdministratorsPage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.administrators', navigate: '/admin/administrators', icon: 'shield-outline' }
  ];

  users: User[] = [];
  filteredUsers: User[] = [];
  editingUser: boolean = false;

  newUser: User | null = null;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private alertConfirmService: AlertConfirmService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Cargar todos los usuarios desde la API
   */
  loadUsers() {
    this.userService.getAllAdmins().subscribe(response => {
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
   * Alternar la vista para añadir un nuevo usuario
   */
  toggleEditUser(user: User) {
    this.newUser = { ...user };
    this.editingUser = !this.editingUser;
    if (!this.editingUser) {
      this.resetForm();
    }
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
      this.editingUser = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.users_edit.error_update_user');
      this.editingUser = false;
      this.resetForm();
    });
  }

  async confirmDelete() {
    const confirmed = await this.alertConfirmService.showAlert('error', 'general.delete', 'admin.users_edit.delete');
    if (confirmed) {
      this.deleteUser();
    } 
  }

  deleteUser() {
    this.userService.deleteUser(this.newUser?._id!).subscribe(() => {
      this.loadUsers();
      this.alertService.showAlert('success', 'admin.users_edit.deleted', 'admin.users_edit.deletedMessage');
      this.editingUser = false;
      this.resetForm();
    }, () => {
      this.alertService.showAlert('error', 'alerts.error_title', 'admin.users_edit.error_delete_user');
      this.editingUser = false;
      this.resetForm();
    });
  }

}
