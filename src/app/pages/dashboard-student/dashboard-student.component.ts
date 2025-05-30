import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { SidebarStudentComponent } from '../../shared/components/sidebar-student/sidebar-student.component';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ApiService } from '../../services/api.service';
import { StudentProfile } from '../../models/student-profile.model';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [CommonModule, SidebarStudentComponent, MenubarModule, BadgeModule, // Add CommonModule
    InputTextModule, AvatarModule, RippleModule, CardModule, PanelModule,
    ButtonModule],
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  student: StudentProfile | null = null;
  lastAppliedOffer: any;
  appliedOffersCount: number = 0;
  jobOffers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStudentProfile().subscribe({
      next: (data: StudentProfile) => {
        this.student = data;
        this.loadDashboardData(data.id);
      },
      error: (err) => console.error('Error cargando perfil:', err)
    });
  }

  private loadDashboardData(studentId: string): void {
    this.apiService.getLastAppliedOffer(studentId).subscribe({
      next: (data) => this.lastAppliedOffer = data,
      error: (err) => console.error('Error cargando última oferta aplicada:', err)
    });

    this.apiService.getAppliedOffersCount(studentId).subscribe({
      next: (count) => this.appliedOffersCount = count,
      error: (err) => console.error('Error cargando contador de ofertas aplicadas:', err)
    });

    this.apiService.getAllOffers().subscribe({
      next: (offers) => this.jobOffers = offers,
      error: (err) => console.error('Error cargando ofertas laborales:', err)
    });
  }
}


