import { Component, forwardRef, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';

  value = '';
  hidePassword = true;

  // 👇 Angular vai registrar essas funções
  onChange = (value: string) => {};
  onTouched = () => {};

  get inputType() {
    if (this.type === 'password') {
      return this.hidePassword ? 'password' : 'text';
    }
    return this.type;
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  // 👇 recebe valor do form
  writeValue(value: string): void {
    this.value = value || '';
  }

  // 👇 registra mudança
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // 👇 registra touched
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  isDisabled = false;

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
