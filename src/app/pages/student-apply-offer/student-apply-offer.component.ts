import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ApiService } from '../../services/api.service';
import { JobOffer } from '../../models/job-offer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-apply-offer',
  standalone: true,
  imports: [
    ButtonModule, DialogModule, InputTextModule, 
    EditorModule, FormsModule, DatePickerModule, 
    SelectModule, KeyFilterModule, InputNumberModule, TextareaModule, CommonModule
  ],
  templateUrl: './student-apply-offer.component.html',
  styleUrl: './student-apply-offer.component.css'
})
export class StudentApplyOfferComponent implements OnInit {
  @Input() offer!: JobOffer;
  loading = false;
  searchTerm = '';
  value = 0;

  dynamicOffers: JobOffer[] = [];
  visible: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.apiService.getAllOffers().subscribe({
      next: (offers: JobOffer[]) => {
        this.dynamicOffers = offers.map((offer: any) => ({
          ...offer,
          companyName: offer.company?.name,
          status: offer.status?.status || offer.status // en caso de que solo sea string
        }));
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

  applyToOffer() {
    const postulationData = {
      studentId: 1, // Cambia esto por el id real del estudiante logueado si lo tienes
      offerId: this.offer.id,
      status: 'Pendiente'
    };

    this.apiService.createPostulation(postulationData).subscribe({
      next: () => {
        alert('¡Postulación enviada correctamente!');
        this.visible = false;
      },
      error: (err) => {
        alert('Error al postularse.');
        console.error(err);
      }
    });
  }
}