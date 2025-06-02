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
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-student-my-applications',
  imports: [SidebarStudentComponent, AvatarModule, MenubarModule, TableModule, ButtonModule,
      InputTextModule, IconFieldModule, InputIconModule, MultiSelectModule, SliderModule,
      SelectModule, ProgressBarModule, TagModule, FormsModule, DatePipe, CommonModule],
  templateUrl: './student-my-applications.component.html',
  styleUrl: './student-my-applications.component.css'
})

export class StudentMyApplicationsComponent {

  constructor() { }


  loading = false;

  applications = [
  {
    name: 'Desarrollador Fullstack',
    modality: 'Presencial',
    location: 'Bogotá',
    date: '2023-05-01',
    salary: 1000000,
    status: 'Pendiente',
  },
  {
    name: 'Desarrollador Backend',
    modality: 'Remoto',
    location: 'Medellín',
    date: '2023-06-15',
    salary: 1200000,
    status: 'Pendiente',
  },
  {
    name: 'Diseñador UI/UX',
    modality: 'Híbrido',
    location: 'Cali',
    date: '2023-07-10',
    salary: 900000,
    status: 'Rechazada',
  },
  {
    name: 'Ingeniero QA',
    modality: 'Remoto',
    location: 'Barranquilla',
    date: '2023-08-20',
    salary: 1100000,
    status: 'Aceptada',
  },
  {
    name: 'Analista de Datos',
    modality: 'Presencial',
    location: 'Bogotá',
    date: '2023-09-05',
    salary: 1300000,
    status: 'Rechazada',
  },
  {
    name: 'Project Manager',
    modality: 'Remoto',
    location: 'Manizales',
    date: '2023-10-01',
    salary: 2000000,
    status: 'Rechazada',
  },
  {
    name: 'Scrum Master',
    modality: 'Híbrido',
    location: 'Pereira',
    date: '2023-11-12',
    salary: 1800000,
    status: 'Aceptada',
  },
  {
    name: 'Soporte Técnico',
    modality: 'Presencial',
    location: 'Santa Marta',
    date: '2023-12-03',
    salary: 950000,
    status: 'Pendiente',
  },
  {
    name: 'Desarrollador Móvil',
    modality: 'Remoto',
    location: 'Cartagena',
    date: '2024-01-20',
    salary: 1400000,
    status: 'Pendiente',
  },
  {
    name: 'Administrador de Sistemas',
    modality: 'Presencial',
    location: 'Bucaramanga',
    date: '2024-02-15',
    salary: 1500000,
    status: 'Pendiente',
  },
  {
    name: 'DevOps Engineer',
    modality: 'Remoto',
    location: 'Tunja',
    date: '2024-03-05',
    salary: 2100000,
    status: 'Rechazada',
  }
];
}
