import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { LoginStudentComponent } from './pages/login-student/login-student.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  
  // Ruta raíz redirige a home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Página principal
  { path: 'home', component: HomeComponent },

  // Rutas de registro
  {
    path: 'register',
    children: [
      { path: 'student', component: RegisterStudentComponent },
    ]
  },

  // Rutas de login
  {
    path: 'login',
    children: [
      { path: 'student', component: LoginStudentComponent }
    ]
  },

  // Ruta comodín (404)
  { path: '**', component: NotFoundComponent }
];