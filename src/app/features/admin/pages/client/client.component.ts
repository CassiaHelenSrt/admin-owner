import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ClientService } from '../../services/client';
import { CreateModalComponent } from '../../components/create-modal/create-modal';
import { ModalComponent } from '@shared/modal/modal.component';
import { ToastService } from 'src/app/core/services/toast';

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
  imports: [AdminUserTable, CreateModalComponent, ModalComponent],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  clients: Client[] = [];
  isCreateModalOpen = false;

  clientColumns: TableColumn<Client>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Foto', field: 'image', type: 'image' },
    { label: 'Nome', field: 'name' },
    { label: 'Telefone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'Anotação', field: 'annotation' },
  ];

  constructor(
    private clientService: ClientService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe({
      next: (res: any) => {
        this.clients = res;
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

  handleCreate(data: any) {
    this.clientService.createClient(data).subscribe({
      next: () => {
        this.getClients();
        this.closeCreateModal();
        this.toast.success('Criado com sucesso');
      },
      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleEdit(client: Client) {
    this.clientService.updateClient(client.id, client).subscribe({
      next: () => {
        this.getClients();
        this.toast.success('Editado com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }

  handleDelete(client: Client) {
    this.clientService.deleteClent(client.id).subscribe({
      next: () => {
        this.getClients();
        this.toast.success('Excluido com sucesso');
      },

      error: (err) => {
        const mensagem = err.error?.message || 'Erro interno';
        this.toast.error(mensagem);
      },
    });
  }
}
