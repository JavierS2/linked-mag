import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginStudentComponent } from './pages/login-student/login-student.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login-student', component: LoginStudentComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
  ];