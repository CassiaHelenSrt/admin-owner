import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'], // ← CORRETO
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';

  hidePassword: boolean = true;

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  get inputType() {
    if (this.type === 'password') {
      return this.hidePassword ? 'password' : 'text';
    }

    return this.type;
  }
}
