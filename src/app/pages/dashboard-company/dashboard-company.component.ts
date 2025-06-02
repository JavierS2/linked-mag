import { Component, Input, OnInit } from '@angular/core';
import { CompanySidebarComponent } from '../../shared/components/company-sidebar/company-sidebar.component';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CompanyDialogApplicationsComponent } from '../company-dialog-applications/company-dialog-applications.component';
import { JobOffer } from '../../models/job-offer';
import { ApiService } from '../../services/api.service';
import { NgForOf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-company',
  imports: [CompanySidebarComponent, MenubarModule, BadgeModule,
    InputTextModule, AvatarModule, RippleModule, CardModule, PanelModule,
    ButtonModule, CompanyDialogApplicationsComponent, NgForOf, CommonModule],
  templateUrl: './dashboard-company.component.html',
  styleUrl: './dashboard-company.component.css'
})
export class DashboardCompanyComponent implements OnInit {

  @Input() offer!: JobOffer;
  loading = false;
  searchTerm = '';
  value = 0;

  dynamicOffers: JobOffer[] = [];
  publishedOffersCount = 0;
  receivedPostulationsCount = 0;
  companyId = 1; // Cambia esto por el id real de la empresa logueada

  visible: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOffers();
    this.loadReceivedPostulations();
  }

  loadOffers() {
    this.loading = true;
    this.apiService.getAllOffers().subscribe({
      next: (offers: JobOffer[]) => {
        // Ofertas abiertas de la empresa
        this.dynamicOffers = offers
          .filter((offer: any) => {
            const estado = offer.status?.status || offer.status;
            return estado === 'Abierta' && offer.companyId === this.companyId;
          })
          .map((offer: any) => ({
            ...offer,
            companyName: offer.company?.name,
            status: offer.status?.status || offer.status
          }));

        // Contador de todas las ofertas publicadas por la empresa (abiertas y cerradas)
        this.publishedOffersCount = offers.filter((offer: any) => offer.companyId === this.companyId).length;

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar ofertas', err);
        this.loading = false;
      }
    });
  }

  loadReceivedPostulations() {
    this.apiService.getAllPostulations().subscribe({
      next: (postulations: any[]) => {
        // Solo postulaciones a ofertas de esta empresa
        this.receivedPostulationsCount = postulations.filter(
          (p: any) => p.offer?.companyId === this.companyId
        ).length;
      },
      error: (err) => {
        console.error('Error al cargar postulaciones', err);
        this.receivedPostulationsCount = 0;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
}