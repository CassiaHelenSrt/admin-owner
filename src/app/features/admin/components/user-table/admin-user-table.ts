import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '@shared/modal/modal.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

export interface TableColumn<T> {
  label: string;
  field: keyof T;
  type?: 'text' | 'image';
  className?: string;
}

@Component({
  selector: 'app-admin-user-table',
  standalone: true,
  imports: [CommonModule, ModalComponent, EditModalComponent, DeleteModalComponent],
  templateUrl: './admin-user-table.html',
  styleUrl: './admin-user-table.scss',
})
export class AdminUserTable<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  // @Input() columns: { label: string; field: string }[] = [];
  // @Input() actions: any[] = [];

  modalType: 'edit' | 'delete' | null = null;
  selectedItem: any = null;

  openEdit(item: any) {
    this.selectedItem = { ...item }; // evita mutação direta

    this.modalType = 'edit';
  }

  openDelete(item: T) {
    this.selectedItem = item;
    this.modalType = 'delete';
  }

  closeModal() {
    this.modalType = null;
    this.selectedItem = null;
  }

  handleEdit(updatedData: T) {
    this.edit.emit(updatedData);
    this.closeModal();
  }

  handleDelete(deleteClient: T) {
    this.delete.emit(deleteClient);
    this.closeModal();
  }
}
