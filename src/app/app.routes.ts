import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { LoginStudentComponent } from './pages/login-student/login-student.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },

    { path: 'register'
      , children: [
        { path: 'student', component: RegisterStudentComponent },

      ]
     },


    { path: 'login', 
      children: [
        { path: 'student', component: LoginStudentComponent }
      ]
    },


    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
  ];