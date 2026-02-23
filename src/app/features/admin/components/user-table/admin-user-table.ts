import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  imports: [CommonModule],
  templateUrl: './admin-user-table.html',
  styleUrl: './admin-user-table.scss',
})
export class AdminUserTable {
  @Input() data: UserTableItem[] = [];

  @Output() edit = new EventEmitter<UserTableItem>();
  @Output() delete = new EventEmitter<UserTableItem>();

  onEdit(item: UserTableItem) {
    this.edit.emit(item);
  }

  onDelete(item: UserTableItem) {
    this.delete.emit(item);
  }
}
