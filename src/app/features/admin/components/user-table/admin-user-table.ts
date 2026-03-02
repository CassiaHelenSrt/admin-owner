import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

export interface UserTableItem {
  id: number;
  image: string;
  name: string;
  type: string;
  price: number;
  duration: string;
  description: string;
}

@Component({
  selector: 'app-admin-user-table',
  standalone: true,
  imports: [CommonModule, ModalComponent, EditModalComponent, DeleteModalComponent],
  templateUrl: './admin-user-table.html',
  styleUrl: './admin-user-table.scss',
})
export class AdminUserTable {
  @Input() data: UserTableItem[] = [];

  modalType: 'edit' | 'delete' | null = null;
  selectedItem: any = null;

  openEdit(item: any) {
    this.selectedItem = { ...item }; // evita mutação direta
    this.modalType = 'edit';
  }

  openDelete(item: any) {
    this.selectedItem = item;
    this.modalType = 'delete';
  }

  closeModal() {
    this.modalType = null;
    this.selectedItem = null;
  }

  handleEdit(updatedData: any) {
    console.log('Atualizar item', updatedData);

    // aqui você chama sua API
    // this.service.update(updatedData).subscribe()

    this.closeModal();
  }

  handleDelete(item: any) {
    console.log('Excluir item', item);

    // this.service.delete(item.id).subscribe()

    this.closeModal();
  }
}
