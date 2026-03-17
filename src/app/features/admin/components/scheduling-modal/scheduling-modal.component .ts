import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheduling-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './scheduling-modal.component .html',
  styleUrls: ['./scheduling-modal.component .scss'],
})
export class SchedulingModalComponent {
  @Input() data: any;
  @Output() saveEvent = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      client: [this.data?.nome, Validators.required],
      service: [this.data?.tipo, Validators.required],
      date: [this.data?.preco, Validators.required],
      start: [this.data?.duracao, Validators.required],
      end: [this.data?.descricao, Validators.required],
      status: [this.data?.descricao, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      this.saveEvent.emit({
        ...this.data,
        ...this.form.value,
      });
    }
  }

  close() {}
}
