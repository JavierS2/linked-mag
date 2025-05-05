import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { RouterOutlet } from '@angular/router'; // Cambia RouterModule por RouterOutlet para componentes standalone

@Component({
  selector: 'app-root',
  standalone: true, // Falta esta línea crucial
  imports: [HomeComponent, RouterOutlet], // Usa RouterOutlet en lugar de RouterModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'linked-mag';
}