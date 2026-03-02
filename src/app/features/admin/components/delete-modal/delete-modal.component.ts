import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @Input() data: any;
  @Output() confirm = new EventEmitter<any>();

  confirmDelete() {
    this.confirm.emit(this.data);
  }
}
