import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ToastService } from 'src/app/core/services/toast';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
}
@Component({
  selector: 'app-users',
  imports: [AdminUserTable],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [];

  usersColumns: TableColumn<User>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Nome', field: 'name' },
    { label: 'Telefone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'Permição', field: 'role' },
  ];

  userFields = [
    {
      name: 'id',
      placeholder: 'Id',
      type: 'text',
    },
    {
      name: 'name',
      placeholder: 'Nome',
      type: 'text',
    },

    {
      name: 'phone',
      placeholder: 'Telefone',
      type: 'text',
    },

    {
      name: 'email',
      placeholder: 'E-mail',
      type: 'email',
    },
    {
      name: 'role',
      placeholder: 'Permição',
      type: 'text',
    },
  ];

  userForm;

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],

      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleEdit(item: User) {
    console.log('Editar', item);
  }

  handleDelete(item: User) {
    console.log('Excluir', item);
  }
}
