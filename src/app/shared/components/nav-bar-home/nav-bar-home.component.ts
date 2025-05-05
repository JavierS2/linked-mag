import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule, Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar-home',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './nav-bar-home.component.html',
  styleUrl: './nav-bar-home.component.css'
})
export class NavBarHomeComponent {
  @ViewChild('menu') menu!: Menu;

  constructor (private router: Router) {}
  items: MenuItem[] = [
    { 
      label: 'Estudiante',
      icon: 'pi pi-user',
      command: () => this.router.navigate(['./login-student'])  // Ruta a redirigir
    },
    { label: 'Empresa', icon: 'pi pi-briefcase' }
  ];

  onButtonClick(event: MouseEvent) {
    this.menu.toggle(event);
  }
}
