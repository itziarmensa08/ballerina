import { Component, OnInit } from '@angular/core';
import { AlertConfirmService } from 'src/app/services/alert-confirm.service';
import { AlertService } from 'src/app/services/alert.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false,
})
export class UsersPage implements OnInit {

  breadcrumbs = [
    { label: 'breadcrumbs.admin', navigate: '/admin', icon: 'settings-outline' },
    { label: 'breadcrumbs.users', navigate: '/admin/users', icon: 'people-outline' }
  ];

  users: User[] = [];
  filteredUsers: User[] = [];
  addingUser: boolean = false;

  newUser: User | null = null;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Cargar todos los usuarios desde la API
   */
  loadUsers() {
    this.userService.getAllUsers().subscribe(response => {
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
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Alternar la vista para añadir un nuevo usuario
   */
  toggleAddUser() {
    this.addingUser = !this.addingUser;
    if (!this.addingUser) {
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
   * Crear un nuevo usuario
   */
  registerUser() {}

}
