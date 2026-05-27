import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ToastService } from 'src/app/core/services/toast';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';
import { CreateModalComponent } from '../../components/create-modal/create-modal';
import { ModalComponent } from '@shared/modal/modal.component';

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
  imports: [AdminUserTable, LoadingComponent, CreateModalComponent, ModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: User[] = [];
  isCreateModalOpen = false;

  usersColumns: TableColumn<User>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Nome', field: 'name' },
    { label: 'E-mail', field: 'email' },
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
      password: [''],
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

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  get createFields() {
    return [
      ...this.userFields,
      { name: 'password', placeholder: 'Senha', type: 'text' }, // O tipo 'password' esconde as letras ao digitar
    ];
  }

  handleCreate() {
    this.userService.createUser(this.userForm.value).subscribe({
      next: () => {
        this.getUsers();
        this.closeCreateModal();
        this.toast.success('Criado com sucesso');
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleEdit(user: User) {
    const id = user.id;

    this.userService.updateEmployees(id, this.userForm.value).subscribe({
      next: () => {
        this.getUsers();
        this.toast.success('Deletado com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleDelete(user: User) {
    this.userService.deleteEmployees(user.id).subscribe({
      next: () => {
        this.getUsers();
        this.toast.success('Excluido com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }
}
