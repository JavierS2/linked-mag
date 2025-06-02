import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Router } from '@angular/router';
import { JobOffer } from '../../models/job-offer';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    CommonModule,
    SidebarStudentComponent,
    MenubarModule,
    BadgeModule,
    InputTextModule,
    AvatarModule,
    RippleModule,
    CardModule,
    PanelModule,
    ButtonModule
  ],
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {

  @Input() offer!: JobOffer;
  loading = false;
  searchTerm = '';
  value = 0;
  visible = false;

  dynamicOffers: JobOffer[] = [];
  appliedOffersCount = 0;
  lastAppliedOffer?: JobOffer;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.apiService.getAllOffers().subscribe({
      next: (offers: JobOffer[]) => {
        console.log('Ofertas recibidas desde el backend:', offers);

        this.dynamicOffers = offers
          .filter((offer: any) => {
            const estado = offer.status?.status || offer.status;
            return estado === 'Abierta';
          })
          .map((offer: any) => ({
            ...offer,
            companyName: offer.company?.name,
            companyLogo: offer.company?.logo, // <-- Asegúrate de que esto exista
            status: offer.status?.status || offer.status
          }));

        console.log('Ofertas mapeadas:', this.dynamicOffers);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar ofertas', err);
        this.loading = false;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  navigateToOffers() {
    this.router.navigate(['/ofertas']); // Ajusta esta ruta según tus rutas reales
  }

  navigateToOfferDetails(id: number | undefined) {
  if (id === undefined) return; // Evita errores
  this.router.navigate(['/ofertas', id]);
  }

}
