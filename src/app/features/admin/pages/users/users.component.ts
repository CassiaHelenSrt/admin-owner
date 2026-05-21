import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ToastService } from 'src/app/core/services/toast';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';
import { LoginComponent } from 'src/app/features/auth/pages/login/login.component';
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
  createdAt: Date;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AdminUserTable, LoadingComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [];

  usersColumns: TableColumn<User>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Nome', field: 'name' },
    { label: 'Telefone', field: 'email' },
    { label: 'Permição', field: 'role' },
  ];

  userFields = [
    {
      name: 'name',
      placeholder: 'Nome',
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
  loading = true;

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = [...res];
        this.loading = false;
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
        this.loading = false;
      },
    });
  }

  handleEdit(user: User) {
    const id = user.id;

    console.log('oi');

    this.userService.updateUser(id, this.userForm.value).subscribe({
      next: () => {
        this.getUsers();

        this.toast.success('Editado com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  // handleEdit(item: User) {
  //   console.log('Editar', item);
  // }

  handleDelete(item: User) {
    console.log('Excluir', item);
  }
}
