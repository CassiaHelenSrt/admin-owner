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
