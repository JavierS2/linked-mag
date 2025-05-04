import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Asegúrate de importar esto
import { ButtonModule } from 'primeng/button';
import { NavBarHomeComponent } from '../../shared/components/nav-bar-home/nav-bar-home.component';

@Component({
  selector: 'app-home',
  standalone: true, // si estás usando Angular 17+ con componentes standalone
  imports: [NavBarHomeComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
