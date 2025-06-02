import { CommonModule, NgForOf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import { JobOffer } from '../../models/job-offer';
import { ApiService } from '../../services/api.service';
import { CompanySidebarComponent } from '../../shared/components/company-sidebar/company-sidebar.component';
import { CompanyDialogApplicationsComponent } from '../company-dialog-applications/company-dialog-applications.component';

@Component({
  selector: 'app-dashboard-company',
  standalone: true,
  imports: [
    CompanySidebarComponent,
    MenubarModule,
    BadgeModule,
    InputTextModule,
    AvatarModule,
    RippleModule,
    CardModule,
    PanelModule,
    ButtonModule,
    CompanyDialogApplicationsComponent,
    NgForOf,
    CommonModule
  ],
  templateUrl: './dashboard-company.component.html',
  styleUrl: './dashboard-company.component.css'
})
export class DashboardCompanyComponent implements OnInit {

  @Input() offer!: JobOffer;

  dynamicOffers: JobOffer[] = [];
  latestOffer: JobOffer | null = null;
  publishedOffersCount: number = 0;
  receivedPostulationsCount = 0;
  companyId = 1;
  loading = false;
  searchTerm = '';
  value = 0;
  visible: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadOffers();
    this.loadReceivedPostulations(); 
  }

  loadReceivedPostulations() {
    this.apiService.getAllPostulations().subscribe({
      next: (postulations: any[]) => {
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

  loadOffers() {
    this.loading = true;
    this.apiService.getAllOffers().subscribe({
      next: (offers: JobOffer[]) => {
        console.log('Ofertas recibidas desde el backend:', offers);

        const filteredOffers = offers.filter((offer: any) => {
          const estado = offer.status?.status || offer.status;
          return estado === 'Abierta' && offer.company?.id === this.companyId;
        });

        this.publishedOffersCount = filteredOffers.length;

        this.dynamicOffers = filteredOffers.map((offer: any) => ({
          ...offer,
          companyName: offer.company?.name,
          status: offer.status?.status || offer.status
        }));

        this.dynamicOffers.sort((a, b) => {
          const idA = a.id ?? 0;
          const idB = b.id ?? 0;
          return idB - idA;
        });

        this.latestOffer = this.dynamicOffers[0] || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar ofertas', err);
        this.loading = false;
      }
    });
  }

  goToLatestOffer() {
    if (this.latestOffer) {
      this.router.navigate(['panel/company/job-offer/', this.latestOffer.id]);
    }
  }

  showDialog() {
    this.visible = true;
  }
}
