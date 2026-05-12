import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Input() title: string = '';
  @Input() fields: any[] = [];
  @Input() form!: FormGroup;

  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  constructor() {}

  submit() {
    if (this.form.valid) {
      this.save.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }

  closeModal() {
    this.close.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);

    if (!control?.errors) return '';

    if (control.errors['required']) {
      return 'Campo obrigatório';
    }

    if (control.errors['minlength']) {
      return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
