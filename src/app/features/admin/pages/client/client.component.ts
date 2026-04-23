import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
import { ClientService } from '../../services/client';
import { CreateModalComponent } from '../../components/create-modal/create-modal';
import { ModalComponent } from '@shared/modal/modal.component';

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

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe({
      next: (res: any) => {
        this.clients = res;
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err);
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
      },
      error: (err) => console.error(err),
    });
  }

  handleEdit(client: Client) {
    this.clientService.updateClient(client.id, client).subscribe({
      next: () => {
        this.getClients();
      },

      error: (err) => {
        console.error('Erro ao editar', err);
      },
    });
  }

  handleDelete(client: Client) {
    this.clientService.deleteClent(client.id).subscribe({
      next: () => {
        this.getClients();
        console.log(client);
        console.log(client.id);
      },

      error: (err) => {
        console.error('Erro ao exluir', err);
      },
    });
  }
}
