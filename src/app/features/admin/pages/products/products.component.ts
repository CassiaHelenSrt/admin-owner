import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ProductsService } from '../../services/products';
import { ToastService } from 'src/app/core/services/toast';
import { ModalComponent } from '@shared/modal/modal.component';
import { CreateModalComponent } from '../../components/create-modal/create-modal';
import { FormBuilder, Validators } from '@angular/forms';

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
  imports: [AdminUserTable, CreateModalComponent, ModalComponent],
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
  isCreateModalOpen = false;

  productForm;

  productFields = [
    {
      name: 'name',
      placeholder: 'Nome',
      type: 'text',
    },

    {
      name: 'type',
      placeholder: 'Tipo',
      type: 'text',
    },

    {
      name: 'price',
      placeholder: 'Preço',
      type: 'text',
    },
    {
      name: 'duration',
      placeholder: 'Duração',
      type: 'text',
    },
    {
      name: 'description',
      placeholder: 'Descriçao',
      type: 'text',
    },
  ];

  constructor(
    private productsService: ProductsService,
    private toast: ToastService,
    private fb: FormBuilder,
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProduct().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  openCreateModal() {
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  handleCreate() {
    const data = {
      ...this.productForm.value,

      price: Number(this.productForm.value.price?.toString().replace(/\./g, '').replace(',', '.')),
    };

    this.productsService.createProduct(data).subscribe({
      next: () => {
        this.getProducts();
        this.closeCreateModal();
        this.toast.success('Criado com sucesso');
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleEdit(product: Product) {
    const id = product.id;
    this.productsService.updateProduct(id, this.productForm.value).subscribe({
      next: () => {
        this.getProducts();

        this.toast.success('Editado com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleDelete(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe({
      next: () => {
        this.getProducts();
        console.log(product);
        this.toast.success('Excluido com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }
}
