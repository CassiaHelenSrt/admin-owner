import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';

export interface Client {
  id: number;
  image: string;
  name: string;
  phone: string;
  email: string;
  annotation: string;
}

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [AdminUserTable],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  clients: Client[] = [
    {
      id: 1,
      image: '/assets/login.jpg',
      name: 'Cassia',
      phone: '99999999',
      email: 'cassia@gmail.com',
      annotation: 'Alergia a alguns produtos',
    },
    {
      id: 2,
      image: '/assets/login.jpg',
      name: 'Maria',
      phone: '88888888',
      email: 'maria@gmail.com',
      annotation: 'Alergia a alguns produtos',
    },
  ];

  clientColumns: TableColumn<Client>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Foto', field: 'image', type: 'image' },
    { label: 'Nome', field: 'name' },
    { label: 'Telefone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'Anotação', field: 'annotation' },
  ];

  handleEdit(item: Client) {
    console.log('Editar', item);
  }

  handleDelete(item: Client) {
    console.log('Excluir', item);
  }
}
