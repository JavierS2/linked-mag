import { Component, OnInit } from '@angular/core';
import { SidebarStudentComponent } from '../../shared/components/sidebar-student/sidebar-student.component';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { DatePipe, CurrencyPipe, registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import { StudentApplyOfferComponent } from '../student-apply-offer/student-apply-offer.component';
import { ApiService } from '../../services/api.service';
import { JobOffer } from '../../models/job-offer';
import { CommonModule } from '@angular/common';
registerLocaleData(localeEsCO, 'es-CO');

@Component({
  selector: 'app-student-offers',
  standalone: true,
  imports: [
    SidebarStudentComponent, AvatarModule, MenubarModule, TableModule, ButtonModule,
    InputTextModule, IconFieldModule, InputIconModule, MultiSelectModule, SliderModule,
    SelectModule, ProgressBarModule, TagModule, FormsModule, StudentApplyOfferComponent, CommonModule
  ],
  templateUrl: './student-offers.component.html',
  styleUrls: ['./student-offers.component.css'],
  providers: [DatePipe, CurrencyPipe]
})
export class StudentOffersComponent implements OnInit {
  loading = false;
  searchTerm = '';
  value = 0;
  visible = true;


  representatives = [
    { name: 'Empresa ABC', image: 'amyelsner.png' },
    { name: 'Empresa XYZ', image: 'onyamalimba.png' }
  ];

  statuses = [
    { label: 'Disponible', value: 'Disponible' },
    { label: 'Cerrada', value: 'Cerrada' }
  ];

  dynamicOffers: JobOffer[] = [];

  constructor(private apiService: ApiService) { }

  studentId = 1;

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    // 1. Trae todas las postulaciones del estudiante
    this.apiService.getAllPostulations().subscribe({
      next: (postulations: any[]) => {
        const appliedOfferIds = postulations
          .filter(p => p.studentId === this.studentId)
          .map(p => p.offerId);

        // 2. Trae todas las ofertas abiertas y filtra las ya aplicadas
        this.apiService.getAllOffers().subscribe({
          next: (offers: JobOffer[]) => {
            this.dynamicOffers = offers
              .filter((offer: any) =>
                (offer.status?.status || offer.status) === 'Abierta' &&
                !appliedOfferIds.includes(offer.id)
              )
              .map((offer: any) => ({
                ...offer,
                companyName: offer.company?.name,
                status: offer.status?.status || offer.status
              }));
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar ofertas', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al cargar postulaciones', err);
        this.loading = false;
      }
    });
  }


  clear(table: any) {
    table.clear();
  }
}
