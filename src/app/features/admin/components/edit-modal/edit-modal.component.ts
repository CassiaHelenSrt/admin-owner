import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  @Input() data: any;
  @Output() save = new EventEmitter<any>();

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
}
