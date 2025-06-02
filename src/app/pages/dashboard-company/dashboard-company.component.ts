import { Component, Input } from '@angular/core';
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
export class DashboardCompanyComponent {

  @Input() offer!: JobOffer;
  loading = false;
  searchTerm = '';
  value = 0;

  dynamicOffers: JobOffer[] = [];
  
    constructor(private apiService: ApiService) {}
  
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


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }


}
