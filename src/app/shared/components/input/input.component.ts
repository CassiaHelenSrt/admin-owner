import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'], // ← CORRETO
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
}
