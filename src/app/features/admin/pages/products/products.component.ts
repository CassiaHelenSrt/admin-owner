import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ProductsService } from '../../services/products';
import { ToastService } from 'src/app/core/services/toast';

interface Product {
  id: number;
  name: string;
  image: string;
  type: string;
  price: number;
  duration: number;
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

  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.getproducts();
  }

  getproducts() {
    this.productsService.getproduct().subscribe({
      next: (res: any) => {
        this.products = res;
        console.log('this.products', this.products);
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }
  handleEdit(item: Product) {
    console.log('Editar', item);
  }

  handleDelete(item: Product) {
    console.log('Excluir', item);
  }
}
