import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStudentComponent } from './pages/register-student/register-student.component';
import { LoginStudentComponent } from './pages/login-student/login-student.component';
import { JobOfferDetailsComponent } from './pages/job-offer-details/job-offer-details.component';

const routes: Routes = [
  { path: 'ofertas/:id', component: JobOfferDetailsComponent },
  { path: 'login/student', component: LoginStudentComponent },
  { path: 'register/student', component: RegisterStudentComponent },
  // ...existing routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
