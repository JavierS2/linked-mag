import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-university-validate-see-company',
  imports: [ButtonModule, DialogModule, InputTextModule, EditorModule, FormsModule, DatePickerModule, 
            SelectModule, KeyFilterModule, InputNumberModule],
  templateUrl: './university-validate-see-company.component.html',
  styleUrl: './university-validate-see-company.component.css'
})
export class UniversityValidateSeeCompanyComponent {

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
