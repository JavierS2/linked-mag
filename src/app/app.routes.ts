import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { LoginStudentComponent } from './pages/login-student/login-student.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardCompanyComponent } from './pages/dashboard-company/dashboard-company.component';
import { DashboardStudentComponent } from './pages/dashboard-student/dashboard-student.component';
import { RegisterCompanyComponent } from './pages/register-company/register-company.component';
import { LoginCompanyComponent } from './pages/login-company/login-company.component';
import { StudentOffersComponent } from './pages/student-offers/student-offers.component';
import { StudentApplicationsComponent } from './pages/student-applications/student-applications.component';
import { JobOfferDetailsComponent } from './pages/job-offer-details/job-offer-details.component';
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
      { path: 'company', component: RegisterCompanyComponent }
    ]
  },

  // Rutas de login
  {
    path: 'login',
    children: [
      { path: 'student', component: LoginStudentComponent },
      { path: 'company', component: LoginCompanyComponent }
    ]
  },

  {
    path: 'panel',
    children: [
      // Rutas dashboard
      {
        path: 'student',
        children: [
          // Dashboard estudiante
          { path: 'home', component: DashboardStudentComponent},
          { path: 'offers', component: StudentOffersComponent},
          { path: 'my-applications', component: StudentApplicationsComponent},
          { path: 'job-offer', component: JobOfferDetailsComponent},   
        ]
      },

      // Dashboard empresa
        { path: 'company', 
          children: [
            { path: 'home', component: DashboardCompanyComponent},
            { path: 'profile', component: DashboardCompanyComponent}
          ]
        },
    ]
  },
    // Ruta comodín (404) (Debe ir de último)
  { path: '**', component: NotFoundComponent },
];