import { Component, ViewChild } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { NavBarHomeComponent } from '../../shared/components/nav-bar-home/nav-bar-home.component';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  standalone: true, // <-- ESTA LÍNEA ES CLAVE
  selector: 'app-register-company',
  imports: [
    NavBarHomeComponent,
    InputNumberModule,
    FormsModule,
    FloatLabel,
    DropdownModule,
    SelectModule,
    FileUploadModule,
    CommonModule,
    ButtonModule,
    HttpClientModule,
    PasswordModule,
  ],
  providers: [MessageService],
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css'],
})
export class RegisterCompanyComponent {
  constructor(
    private messageService: MessageService,
    private router: Router,
    private apiService: ApiService
  ) {}
  goToStudentHome() {
    this.router.navigate(['/ruta-home-estudiante']);
  }

  //Información de la empresa
  nameCompany: string = '';
  emailCompany: string = '';
  phoneCompany: number | undefined;
  NIT: number | undefined;
  addressCompany: string = '';
  password: string = '';
  confirmPassword: string = '';
  //

  // Ubicación
  deparmentCompany: string = '';
  cityCompany: string = '';
  //

  // Descrición
  descriptionCompany: string = '';

  // imagenes de perfil
  profileImage: string = '';
  banner: string = '';

  selectEconomicSector: any = null;

  economicSector: any = [
    { id: 1, name: 'Desarrollo de software' },
    { id: 2, name: 'Comercio electrónico' },
    { id: 3, name: 'Servicios financieros' },
    { id: 4, name: 'Educación y tecnología educativa' },
    { id: 5, name: 'Salud y tecnología médica' },
    { id: 6, name: 'Logística y transporte' },
    { id: 7, name: 'Marketing digital y publicidad' },
    { id: 8, name: 'Consultoría empresarial' },
    { id: 9, name: 'Servicios en la nube e infraestructura TI' },
    { id: 10, name: 'Inteligencia artificial y automatización' },
    { id: 11, name: 'Ciberseguridad' },
    { id: 12, name: 'Recursos humanos y reclutamiento' },
    { id: 13, name: 'Construcción e ingeniería digital' },
    { id: 14, name: 'Energía y sostenibilidad' },
    { id: 15, name: 'Agroindustria tecnológica' },
    { id: 16, name: 'Entretenimiento digital y multimedia' },
    { id: 17, name: 'Realidad virtual y aumentada' },
    { id: 18, name: 'Investigación y desarrollo (I+D)' },
    { id: 19, name: 'Análisis de datos y Big Data' },
    { id: 20, name: 'Gobierno digital y servicios públicos' },
    { id: 21, name: 'Otros' },
  ];

  selectTypeCompany: any = null;

  typeCompany: any = [
    { id: 1, name: 'Privada' },
    { id: 2, name: 'Publica' },
  ];

  validarFormulario(): void {
    const payload = {
      nameCompany: this.nameCompany,
      emailCompany: this.emailCompany,
      NIT: this.NIT,
      password: this.password,
      selectEconomicSector: this.selectEconomicSector?.name || '', // Ensure the name is sent
      selectTypeCompany: this.selectTypeCompany?.name || '', // Ensure the name is sent
    };

    this.apiService.createCompany(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'La empresa ha sido registrada correctamente.',
        });
        this.router.navigate(['/login/company']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: err.error.message || 'No se pudo registrar la empresa.',
        });
      },
    });
  }
}
