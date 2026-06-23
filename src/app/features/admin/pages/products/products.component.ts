import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ProductsService } from '../../services/products';
import { ToastService } from 'src/app/core/services/toast';
import { ModalComponent } from '@shared/modal/modal.component';
import { CreateModalComponent } from '../../components/create-modal/create-modal';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';

interface Product {
  id: number;
  name: string;
  photo: string;
  type: string;
  price: number;
  duration: number;
  description: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AdminUserTable, CreateModalComponent, ModalComponent, LoadingComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productColumns: TableColumn<Product>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Foto', field: 'photo', type: 'image' },
    { label: 'Nome', field: 'name' },
    { label: 'Tipo', field: 'type' },
    { label: 'Preço', field: 'price' },
    { label: 'Duração', field: 'duration' },
    { label: 'Descrição', field: 'description', className: 'description' },
  ];

  loading = true;

  products: Product[] = [];

  isCreateModalOpen = false;

  fotoSelecionada: File | null = null;

  productForm;

  productFields = [
    {
      name: 'photo',
      placeholder: 'Foto',
      type: 'file', // Tipo arquivo
    },
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
      photo: [null],
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

  onFileChange(file: any) {
    // Se o evento vier direto com o arquivo físico
    if (file instanceof File) {
      this.fotoSelecionada = file;
    }
    // Se o evento vier do input de arquivo padrão do navegador
    else if (file?.target?.files?.[0]) {
      this.fotoSelecionada = file.target.files[0];
    }
    // Caso venha em outro formato customizado do seu modal
    else {
      this.fotoSelecionada = file;
    }

    console.log('Foto salva na variável:', this.fotoSelecionada);
  }

  getProducts() {
    this.loading = true;

    this.productsService.getProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = [...res];
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

  handleCreate() {
    if (this.productForm.invalid) return;

    // 1. Criamos a "caixa" FormData
    const formData = new FormData();

    // 2. Colocamos os textos normais dentro dela
    formData.append('name', this.productForm.value.name || '');
    formData.append('type', this.productForm.value.type || '');
    formData.append('duration', this.productForm.value.duration || '');
    formData.append('description', this.productForm.value.description || '');

    // Tratamento do preço que você já fazia
    const precoTratado = Number(
      this.productForm.value.price?.toString().replace(/\./g, '').replace(',', '.'),
    );

    formData.append('price', precoTratado.toString());

    // 3. Colocamos a foto apenas se o usuário escolheu uma
    if (this.fotoSelecionada) {
      formData.append('photo', this.fotoSelecionada, this.fotoSelecionada.name);
    }

    console.log('Dados do Formulário:', Object.fromEntries(formData));

    // 4. Enviamos o formData para o seu serviço
    this.productsService.createProduct(formData).subscribe({
      next: () => {
        this.getProducts();
        this.closeCreateModal();
        this.toast.success('Criado com sucesso');
        this.fotoSelecionada = null; // Limpa a foto para a próxima vez
        this.productForm.reset();
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
