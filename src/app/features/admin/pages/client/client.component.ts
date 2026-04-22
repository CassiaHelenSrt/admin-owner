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
  isCreateModalOpen = false;

  clientColumns: TableColumn<Client>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Foto', field: 'image', type: 'image' },
    { label: 'Nome', field: 'name' },
    { label: 'Telefone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'Anotação', field: 'annotation' },
  ];

  clients: Client[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe({
      next: (res: any) => {
        console.log('Dados recebidos:', res);
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
    console.log('Novo cliente:', data);

    // chamar service POST aqui

    this.closeCreateModal();
  }

  handleEdit(item: Client) {
    console.log('Editar', item);
  }

  handleDelete(item: Client) {
    console.log('Excluir', item);
  }
}
