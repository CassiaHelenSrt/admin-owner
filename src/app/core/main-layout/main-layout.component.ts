import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { SidebarComponent } from '@shared/sidebar/sidebar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { HeaderComponent } from '@shared/header/header.component';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
