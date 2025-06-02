import { Component, Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { ApiService } from '../../services/api.service';
import { JobOffer } from '../../models/job-offer';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-dialog-applications',
  imports: [ButtonModule, DialogModule, InputTextModule, EditorModule, FormsModule, DatePickerModule, ToastModule, SelectModule, KeyFilterModule, InputNumberModule],
  providers:[MessageService],
  templateUrl: './company-dialog-applications.component.html',
})
export class CompanyDialogApplicationsComponent {
  
  constructor(@Inject(ApiService) private jobOfferService: ApiService, private messageService: MessageService) {}

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
      next: (response: any) => {
        this.handleResponse(response)
        this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Oferta publicada correctamente'});
        this.visible = false; // Cierra el diálogo después de publicar
      },
      error: (err: any) => {
        this.handleError(err);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se pudo publicar la oferta'});
      }
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