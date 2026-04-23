import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class ToastComponent {
  visible = false;

  message = '';

  type = 'success';

  constructor(private toast: ToastService) {
    this.toast.toastState.subscribe((res) => {
      this.message = res.message;
      this.type = res.type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }

  close() {
    this.visible = false;
    this.toast.hide();
  }

  getIcon() {
    switch (this.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'cancel';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }
}
