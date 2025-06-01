import { Component } from '@angular/core';
import { CompanySidebarComponent } from '../../shared/components/company-sidebar/company-sidebar.component';
import { AvatarModule } from 'primeng/avatar';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { JobOffer } from '../../models/job-offer';
import { CompanyDialogEditOfferComponent } from '../company-dialog-edit-offer/company-dialog-edit-offer.component';

@Component({
  selector: 'app-company-my-job-offers',
  imports: [CompanySidebarComponent, AvatarModule, MenubarModule, TableModule, ButtonModule,
      InputTextModule, IconFieldModule, InputIconModule, MultiSelectModule, SliderModule,
      SelectModule, ProgressBarModule, TagModule, FormsModule, DatePipe, CommonModule, TagModule, RouterLink, CompanyDialogEditOfferComponent],
  templateUrl: './company-my-job-offers.component.html',
  styleUrl: './company-my-job-offers.component.css'
})

export class CompanyMyJobOffersComponent {

  constructor(public api: ApiService) { }

  loading = false;
  jobOffers: JobOffer[] = [
  {
    name: 'Desarrollador Frontend',
    companyId: 1,
    email: 'frontend@empresa.com',
    phone: 3124567890,
    date: new Date('2025-06-15T09:00:00'),
    city: 'Bogotá',
    modality: 'Remoto',
    salary: 5000000,
    description: 'Buscamos desarrollador frontend con experiencia en Angular y PrimeNG.',
    status: 'Abierta'
  },
  {
    name: 'Analista de Datos',
    companyId: 1,
    email: 'datos@empresa.com',
    phone: 3101234567,
    date: new Date('2025-07-01T08:00:00'),
    city: 'Medellín',
    modality: 'Presencial',
    salary: 4500000,
    description: 'Responsable de análisis y visualización de datos para informes ejecutivos.',
    status: 'Cerrada'
  },
  {
    name: 'Ingeniero DevOps',
    companyId: 1,
    email: 'devops@empresa.com',
    phone: 3209876543,
    date: new Date('2025-06-20T10:00:00'),
    city: 'Cali',
    modality: 'Híbrido',
    salary: 6000000,
    description: 'Se requiere ingeniero DevOps con conocimientos en CI/CD, Docker y AWS.',
    status: 'Abierta'
  },
  {
    name: 'Diseñador UI/UX',
    companyId: 1,
    email: 'diseno@empresa.com',
    phone: 3187654321,
    date: new Date('2025-06-10T11:30:00'),
    city: 'Barranquilla',
    modality: 'Remoto',
    salary: 4000000,
    description: 'Diseñador con experiencia en prototipado, Figma y diseño centrado en el usuario.',
    status: 'Cerrada'
  },
  {
    name: 'Gerente de Proyecto',
    companyId: 1,
    email: 'proyectos@empresa.com',
    phone: 3001122334,
    date: new Date('2025-07-05T14:00:00'),
    city: 'Santa Marta',
    modality: 'Presencial',
    salary: 7000000,
    description: 'Liderazgo de proyectos tecnológicos, manejo de cronogramas, recursos y equipo.',
    status: 'Abierta'
  }
];

ngOnInit() {
  this.loadOffers();

  
}

handleOfferUpdated(updatedOffer: any) {
  const index = this.jobOffers.findIndex(o => o.id === updatedOffer.id);
  if (index !== -1) {
    this.jobOffers[index] = updatedOffer;
  }
}

loadOffers() {
  this.api.getAllOffers().subscribe({
    next: (offers: JobOffer[]) => {
      this.jobOffers = offers;
    },
    error: (err) => {
      console.error('Error al cargar ofertas', err);
    }
  });
}

onDeleteOffer(offerId: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
    this.api.deleteOffer(offerId).subscribe({
      next: () => {
        this.jobOffers = this.jobOffers.filter(offer => offer.id !== offerId);
      },
      error: (err) => {
        console.error('Error al eliminar la oferta:', err);
        alert('Ocurrió un error al eliminar la oferta.');
      }
    });
  }
}

}