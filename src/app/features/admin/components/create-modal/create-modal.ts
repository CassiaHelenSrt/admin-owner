import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.scss',
})
export class CreateModalComponent {
  @Input() title = '';

  @Input() form!: FormGroup;

  @Input() fields: any[] = [];

  @Output() save = new EventEmitter<void>();

  @Output() close = new EventEmitter<void>();

  @Output() fileChange = new EventEmitter<File>();

  constructor() {}

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.fileChange.emit(file);
    }
  }

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
