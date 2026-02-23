import { Component } from '@angular/core';
import { AdminUserTable } from '../../components/user-table/admin-user-table';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [AdminUserTable],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  services = [
    {
      id: 1,
      image: 'assetes/login.jpg',
      name: 'Volume Brasileiro',
      type: 'Extensão de Cílios',
      price: 150,
      duration: '1h30min',
      description: 'Alongamento de cílios com técnica volume brasileiro',
    },
    {
      id: 2,
      image: 'assetes/login.jpg',
      name: 'Volume Brasileiro',
      type: 'Extensão de Cílios',
      price: 150,
      duration: '1h30min',
      description: 'Alongamento de cílios com técnica volume brasileiro',
    },
    {
      id: 3,
      image: 'assetes/login.jpg',
      name: 'Volume Brasileiro',
      type: 'Extensão de Cílios',
      price: 150,
      duration: '1h30min',
      description: 'Alongamento de cílios com técnica volume brasileiro',
    },
  ];

  handleEdit(item: any) {
    console.log('Editar', item);
  }

  handleDelete(item: any) {
    console.log('Excluir', item);
  }
}
