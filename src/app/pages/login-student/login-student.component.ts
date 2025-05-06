import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { NavBarHomeComponent } from "../../shared/components/nav-bar-home/nav-bar-home.component";
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login-student',
  imports: [NavBarHomeComponent, InputGroupModule, InputGroupAddonModule, FormsModule, PasswordModule],
  templateUrl: './login-student.component.html',
  styleUrl: './login-student.component.css'
})
export class LoginStudentComponent {
  text1: string = '';
  value: string = '';
}
