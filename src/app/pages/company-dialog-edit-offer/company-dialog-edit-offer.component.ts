import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectModule } from 'primeng/select';
import { JobOffer } from '../../models/job-offer';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-company-dialog-edit-offer',
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    EditorModule,
    FormsModule,
    DatePickerModule,
    SelectModule,
    KeyFilterModule,
    InputNumberModule
  ],
  templateUrl: './company-dialog-edit-offer.component.html',
  styleUrl: './company-dialog-edit-offer.component.css'
})
export class CompanyDialogEditOfferComponent {

  constructor(@Inject(ApiService) private api: ApiService) {}

  @Input() offer: any;

  visible: boolean = false;
  jobOffers: JobOffer[] = [];

  // Variables locales para el formulario
  name: string = '';
  email: string = '';
  phone: number | null = null;
  date: Date | null = null;
  city: any = null;
  modality: any = null;
  salary: number | null = null;
  description: string = '';
  status: any = null;

  // Opciones
  modalities: any[] = [
    { name: 'Presencial' },
    { name: 'Híbrido' },
    { name: 'Remoto' }
  ];

  cities: any[] = [
    { name: 'Madrid' },
    { name: 'Bogotá' },
    { name: 'Londres' },
    { name: 'New York' }
  ];

  statusList: any[] = [
    { name: 'Abierta' },
    { name: 'Cerrada' }
  ];

  showDialog(): void {
    if (this.offer) {
      // Cargar valores del objeto en las variables locales
      this.name = this.offer.name || '';
      this.email = this.offer.email || '';
      this.phone = this.offer.phone || null;
      this.date = this.offer.date ? new Date(this.offer.date) : null;
      this.city = this.cities.find(c => c.name === this.offer.city) || null;
      this.modality = this.modalities.find(m => m.name === this.offer.modality) || null;
      this.status = this.statusList.find(s => s.name === this.offer.status) || null;
      this.salary = this.offer.salary || null;
      this.description = this.offer.description || '';
    }

    this.visible = true;
  }

  onEditOffer(): void {
    if (!this.offer) return;

    const updatedOffer: JobOffer = {
      ...this.offer,
      name: this.name,
      email: this.email,
      phone: this.phone,
      date: this.date,
      city: this.city?.name,
      modality: this.modality?.name,
      status: this.status?.name,
      salary: this.salary,
      description: this.description
    };

    if (confirm('¿Estás seguro de que deseas actualizar esta oferta?')) {
      this.api.updateOffer(updatedOffer.id!, updatedOffer).subscribe({
        next: (result: JobOffer) => {
          this.jobOffers = this.jobOffers.map(o =>
            o.id === result.id ? result : o
          );
          alert('La oferta fue actualizada correctamente.');
          this.visible = false;
        },
        error: (err) => {
          console.error('Error al actualizar la oferta:', err);
          alert('Ocurrió un error al actualizar la oferta.');
        }
      });
    }
  }

  handleResponse(response: any) {
    console.log('Oferta actualizada', response);
    this.visible = false;
  }

  handleError(err: any) {
    console.error('Error al actualizar oferta', err);
  }
}
