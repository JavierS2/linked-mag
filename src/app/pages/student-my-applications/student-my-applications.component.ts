import { Component, OnInit } from '@angular/core';
import { SidebarStudentComponent } from '../../shared/components/sidebar-student/sidebar-student.component';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-my-applications',
  imports: [SidebarStudentComponent, AvatarModule, MenubarModule, TableModule, ButtonModule,
      InputTextModule, IconFieldModule, InputIconModule, MultiSelectModule, SliderModule,
      SelectModule, ProgressBarModule, TagModule, FormsModule, DatePipe, CommonModule],
  templateUrl: './student-my-applications.component.html',
  styleUrl: './student-my-applications.component.css'
})
export class StudentMyApplicationsComponent implements OnInit {

  constructor(private api: ApiService) {}

  loading = false;
  applications: any[] = [];
  studentId = 1; // Cambia esto por el id real del estudiante logueado

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.api.getAllPostulations().subscribe({
      next: (data) => {
        // Filtra solo las postulaciones del estudiante actual y mapea los datos de la oferta
        this.applications = data
          .filter((p: any) => p.studentId === this.studentId)
          .map((p: any) => ({
            name: p.offer?.name,
            modality: p.offer?.modality,
            location: p.offer?.city,
            date: p.offer?.date,
            salary: p.offer?.salary,
            status: p.status,
          }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar postulaciones:', err);
        this.loading = false;
      }
    });
  }
}