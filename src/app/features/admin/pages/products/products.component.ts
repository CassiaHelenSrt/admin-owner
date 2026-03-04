import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';

interface Product {
  id: number;
  name: string;
  image: string;
  type: string;
  price: number;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AdminUserTable],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productColumns: TableColumn<Product>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Foto', field: 'image', type: 'image' },
    { label: 'Nome', field: 'name' },
    { label: 'Tipo', field: 'type' },
    { label: 'Preço', field: 'price' },
    { label: 'Duração', field: 'duration' },
    { label: 'Descrição', field: 'description', className: 'description' },
  ];

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
  ];

  handleEdit(item: Product) {
    console.log('Editar', item);
  }

  handleDelete(item: Product) {
    console.log('Excluir', item);
  }
}
