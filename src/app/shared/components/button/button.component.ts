import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'], // ← CORRETO
})
export class ButtonComponent {}
