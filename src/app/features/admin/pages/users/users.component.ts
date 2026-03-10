import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
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
  users: User[] = [
    {
      id: '1',
      name: 'Maria',
      phone: 919087614204,
      email: 'maria@email.com',
      role: 'ADMIN',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'João',
      phone: 919087614204,
      email: 'joao@email.com',
      role: 'USER',
      createdAt: new Date(),
    },
  ];

  usersColumns: TableColumn<User>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Nome', field: 'name' },
    { label: 'Telefone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'Permição', field: 'role' },
  ];

  handleEdit(item: User) {
    console.log('Editar', item);
  }

  handleDelete(item: User) {
    console.log('Excluir', item);
  }
}
