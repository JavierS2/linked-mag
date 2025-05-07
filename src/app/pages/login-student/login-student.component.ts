import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { NavBarLoginComponent } from '../../shared/components/nav-bar-login/nav-bar-login.component';

@Component({
  selector: 'app-login-student',
  imports: [NavBarLoginComponent, InputGroupModule, InputGroupAddonModule, FormsModule, PasswordModule],
  templateUrl: './login-student.component.html',
  styleUrl: './login-student.component.css'
})
export class LoginStudentComponent {
  text1: string = '';
  value: string = '';
}
