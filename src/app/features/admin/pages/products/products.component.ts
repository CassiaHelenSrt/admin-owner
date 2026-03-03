import { Component } from '@angular/core';
import { AdminUserTable } from '../../components/user-table/admin-user-table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AdminUserTable],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products = [
    {
      id: 1,
      image: '/assets/login.jpg',
      name: 'Volume Brasileiro',
      type: 'Extensão de Cílios',
      price: 150,
      duration: '1h30min',
      description: 'Alongamento de cílios com técnica volume brasileiro',
    },
    {
      id: 2,
      image: '/assets/login.jpg',
      name: 'Volume Brasileiro',
      type: 'Extensão de Cílios',
      price: 150,
      duration: '1h30min',
      description: 'Alongamento de cílios com técnica volume brasileiro',
    },
    {
      id: 3,
      image: '/assets/login.jpg',
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
