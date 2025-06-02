import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { PasswordModule } from 'primeng/password';
import { NavBarLoginComponent } from '../../shared/components/nav-bar-login/nav-bar-login.component';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-university-login',
  imports: [NavBarLoginComponent, FormsModule, InputGroupModule, PasswordModule],
  templateUrl: './university-login.component.html',
  styleUrl: './university-login.component.css'
})
export class UniversityLoginComponent {
  text1: string = '';
  value: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  
}
