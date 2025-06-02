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

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  
}
