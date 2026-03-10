import { Component } from '@angular/core';
import { AdminUserTable, TableColumn } from '../../components/user-table/admin-user-table';
export interface Payment {
  id: number;
  client: string;
  service: string;
  value: string;
  type: string;
  status: string;
  createdAt: Date;
}

@Component({
  selector: 'app-payments',
  imports: [AdminUserTable],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class Paymentscomponent {
  payments: Payment[] = [
    {
      id: 1,
      client: 'Maria',
      service: 'Extensão de Cílios',
      value: '130,00',
      type: 'cartao',
      status: 'pago',
      createdAt: new Date(),
    },
    {
      id: 2,
      client: 'João',
      service: 'Extensão de Cílios',
      value: '130,00',
      type: 'cartao',
      status: 'pago',
      createdAt: new Date(),
    },
  ];

  paymentsColumns: TableColumn<Payment>[] = [
    { label: 'Id', field: 'id' },
    { label: 'Cliente', field: 'client' },
    { label: 'Serviço', field: 'service' },
    { label: 'Valor', field: 'value' },
    { label: 'Pagamento', field: 'type' },
    { label: 'Status', field: 'status' },
  ];

  handleEdit(item: Payment) {
    console.log('Editar', item);
  }

  handleDelete(item: Payment) {
    console.log('Excluir', item);
  }
}
