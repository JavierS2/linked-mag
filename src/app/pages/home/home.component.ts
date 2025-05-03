import { Component } from '@angular/core';
import { NavBarHomeComponent } from '../../shared/components/nav-bar-home/nav-bar-home.component';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [NavBarHomeComponent, ButtonModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
