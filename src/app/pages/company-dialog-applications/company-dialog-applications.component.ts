import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-company-dialog-applications',
  imports: [ButtonModule, DialogModule, InputTextModule, EditorModule, FormsModule, DatePickerModule, SelectModule, KeyFilterModule, InputNumberModule],
  templateUrl: './company-dialog-applications.component.html',
  styleUrl: './company-dialog-applications.component.css'
})
export class CompanyDialogApplicationsComponent {
  
  name: string = '';
  email: string = '';
  phone : number | null = null;
  date: Date | null = null;
  city: string = '';
  country: string = '';
  modality: string = '';
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
