import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-modal.html',
  styleUrl: './create-modal.scss',
})
export class CreateModalComponent {
  @Input() title = '';

  @Input() data: any;

  @Output() save = new EventEmitter<any>();

  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data?.name, Validators.required],
      email: [this.data?.email, Validators.required],
      phone: [this.data?.phone, Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.save.emit({
        ...this.data,
        ...this.form.value,
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
