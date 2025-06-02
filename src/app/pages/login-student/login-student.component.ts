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
  selector: 'app-login-student',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    InputGroupModule,
    NavBarLoginComponent
  ],
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  code: number | null = null;
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.code || !this.password) {
      alert('Por favor ingrese usuario y contraseña.');
      return;
    }

    this.authService.loginStudent(this.code, this.password).subscribe({
      next: (res: any) => {
        this.authService.saveAuthData(res.token, res.student);
        this.router.navigate(['/panel/student/home']);
      },
      error: (err) => {
        alert('Credenciales inválidas o error en el servidor.');
        console.error(err);
      }
    });
  }
}