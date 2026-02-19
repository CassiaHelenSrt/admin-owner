import { Component, Input, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';

  hidePassword = true;

  constructor(@Optional() @Self() public ngControl: NgControl) {}

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
