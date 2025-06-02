import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { NavBarLoginComponent } from '../../shared/components/nav-bar-login/nav-bar-login.component';

@Component({
  selector: 'app-login-company',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputGroupModule,
    NavBarLoginComponent
  ],
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class LoginCompanyComponent {
  nit: number | null = null;
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.nit || !this.password) {
      alert('Por favor ingrese NIT y contraseña.');
      return;
    }

    this.authService.loginCompany(this.nit, this.password).subscribe({
      next: (res: any) => {
        this.authService.saveAuthData(res.token, res.company);
        this.router.navigate(['/panel/company/home']);
      },
      error: (err) => {
        alert('Credenciales inválidas o error en el servidor.');
        console.error(err);
      }
    });
  }
}