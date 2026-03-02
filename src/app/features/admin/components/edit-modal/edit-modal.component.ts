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
      nome: [this.data?.nome, Validators.required],
      tipo: [this.data?.tipo, Validators.required],
      preco: [this.data?.preco, Validators.required],
      duracao: [this.data?.duracao, Validators.required],
      descricao: [this.data?.descricao, Validators.required],
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
