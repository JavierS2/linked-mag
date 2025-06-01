import { Component, Inject } from '@angular/core';
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
  imports: [ButtonModule, DialogModule, InputTextModule, 
    EditorModule, FormsModule, DatePickerModule, 
    SelectModule, KeyFilterModule, InputNumberModule],
  templateUrl: './company-dialog-edit-offer.component.html',
  styleUrl: './company-dialog-edit-offer.component.css'
})

export class CompanyDialogEditOfferComponent {
  constructor(@Inject(ApiService) private jobOfferService: ApiService) {}

  publishOffer() {
    const offer: JobOffer = {
      name: this.name,
      companyId: 1, // Assuming a static company ID for demonstration
      email: this.email,
      phone: this.phone,
      date: this.date,
      city: this.city ? this.city.name : '',           // <-- Solo el string
      modality: this.modality ? this.modality.name : '', // <-- Solo el string
      salary: this.salary,
      description: this.description,
      status: 'Abierta' // Estado inicial de la oferta
    };

    this.jobOfferService.createOffer(offer).subscribe({
      next: (response: any) => this.handleResponse(response),
      error: (err: any) => this.handleError(err)
    });
  }

  handleResponse(response: any) {
    console.log('Oferta publicada', response);
    this.visible = false;
  }

  handleError(err: any) {
    console.error('Error al publicar oferta', err);
  }

  name: string = '';
  email: string = '';
  phone : number | null = null;
  date: Date | null = null;
  city: any = null;         // <-- Cambia a any para que almacene el objeto seleccionado
  modality: any = null;     // <-- Cambia a any para que almacene el objeto seleccionado
  salary: number | null = null;
  description: string = '';
  visible: boolean = false;

  modalities: any[] = [
    {name: 'Presencial'},
    {name: 'Híbrido'},
    {name: 'Remoto'}
  ];
  
  cities: any[] = [
    {name: 'Madrid'},
    {name: 'Bogotá'},
    {name: 'Londres'},
    {name: 'New York'}  
  ];

  showDialog() {
    this.visible = true;
  }
}
