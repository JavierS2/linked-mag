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

@Component({
  selector: 'app-company-my-job-offers',
  imports: [CompanySidebarComponent, AvatarModule, MenubarModule, TableModule, ButtonModule,
      InputTextModule, IconFieldModule, InputIconModule, MultiSelectModule, SliderModule,
      SelectModule, ProgressBarModule, TagModule, FormsModule, DatePipe, CommonModule, TagModule, RouterLink],
  templateUrl: './company-my-job-offers.component.html',
  styleUrl: './company-my-job-offers.component.css'
})

export class CompanyMyJobOffersComponent {

  constructor(private api: ApiService) { }

  loading = false;
  jobOffers: JobOffer[] = [];

  ngOnInit() {
    this.loadOffers();
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
}