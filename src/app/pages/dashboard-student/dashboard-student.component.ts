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
  studentId = 1; // Cambia esto por el id real del estudiante logueado

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadOffers();
    this.loadAppliedOffersCount();
  }

  loadOffers() {
    this.loading = true;
    this.apiService.getAllOffers().subscribe({
      next: (offers: JobOffer[]) => {
        this.dynamicOffers = offers
          .filter((offer: any) => {
            const estado = offer.status?.status || offer.status;
            return estado === 'Abierta';
          })
          .map((offer: any) => ({
            ...offer,
            companyName: offer.company?.name,
            companyLogo: offer.company?.logo,
            status: offer.status?.status || offer.status
          }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar ofertas', err);
        this.loading = false;
      }
    });
  }

  loadAppliedOffersCount() {
    this.apiService.getAllPostulations().subscribe({
      next: (postulations: any[]) => {
        this.appliedOffersCount = postulations.filter(p => p.studentId === this.studentId).length;
      },
      error: (err) => {
        console.error('Error al cargar postulaciones', err);
        this.appliedOffersCount = 0;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  navigateToOffers() {
    this.router.navigate(['/ofertas']);
  }

  navigateToOfferDetails(id: number | undefined) {
    if (id === undefined) return;
    this.router.navigate(['/ofertas', id]);
  }
}