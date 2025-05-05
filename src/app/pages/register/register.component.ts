import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea'; // Corregido a minúsculas
import { NavBarHomeComponent } from "../../shared/components/nav-bar-home/nav-bar-home.component";
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarHomeComponent, ButtonModule, FloatLabelModule, FormsModule, TextareaModule, 
            DropdownModule, SelectModule, HttpClientModule, ToastModule],
            providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClientModule, private messageService: MessageService) {}
  name: string = '';
  email: string = '';  // Propiedad que enlazará con ngModel
  selectPrograma: any;
  studentCode: string = '';
  password: string = '';
  confirmPassword: string = '';
  academicPrograms: any[] = [
    { name: 'Licenciatura en Artes', code: '109379' },
    { name: 'Licenciatura en Ciencias Naturales y Educación Ambiental', code: '108279' },
    { name: 'Licenciatura en Educación Campesina y Rural', code: '108301' },
    { name: 'Licenciatura en Educación Infantil', code: '108967' },
    { name: 'Licenciatura en Etnoeducación', code: '109380' },
    { name: 'Licenciatura en Informática', code: '11420' },
    { name: 'Licenciatura en Lenguas Extranjeras con Énfasis en Inglés', code: '108302' },
    { name: 'Licenciatura en Literatura y Lengua Castellana - Modalidad A distancia', code: '108733' },
    { name: 'Licenciatura en Literatura y Lengua Castellana - Presencial', code: '108278' },
    { name: 'Licenciatura en Matemática - Modalidad Virtual', code: '116019' },
    { name: 'Licenciatura en Matemáticas (Modalidad Presencial)', code: '108277' },
    { name: 'Licenciatura en Preescolar', code: '11410' },
    { name: 'Licenciatura en Química', code: '109378' },
    { name: 'Licenciatura en Tecnología', code: '109090' },
    { name: 'Administración de Empresas', code: '19781' },
    { name: 'Administración de Empresas Turísticas y Hoteleras Formación por Ciclos Propedéuticos', code: '102179' },
    { name: 'Administración de la Seguridad y Salud en el Trabajo por ciclos propedéuticos - Modalidad Virtual', code: '107456' },
    { name: 'Administración Pública por Ciclos Propedéuticos - Modalidad Virtual', code: '107600' },
    { name: 'Contaduría Pública', code: '11958' },
    { name: 'Economía', code: '882' },
    { name: 'Gestión Cultural y de Industrias Creativas - Modalidad a Distancia', code: '108899' },
    { name: 'Negocios Internacionales', code: '12008' },
    { name: 'Técnico Profesional en Prevención de Riesgos Laborales por ciclos propedéuticos - Modalidad Virtual', code: '107457' },
    { name: 'Técnico Profesional en Procesos de Gestión Pública Territorial por Ciclos Propedéuticos - Modalidad Virtual', code: '107598' },
    { name: 'Tecnología en Gestión de la Seguridad y Salud en el Trabajo por Ciclos Propedéuticos - Modalidad virtual', code: '107476' },
    { name: 'Tecnología en Gestión Hotelera y Turística – Formación por Ciclos Propedéuticos', code: '11557' },
    { name: 'Tecnología en Gestión Pública Territorial por Ciclos Propedéuticos - Modalidad Virtual', code: '107599' },
    { name: 'Ingeniería Agronómica', code: '885' },
    { name: 'Ingeniería Ambiental y Sanitaria', code: '11221' },
    { name: 'Ingeniería Civil', code: '7112' },
    { name: 'Ingeniería de Sistemas', code: '3147' },
    { name: 'Ingeniería Electrónica', code: '20409' },
    { name: 'Ingeniería Industrial', code: '9853' },
    { name: 'Ingeniería Marino-Costera', code: '116006' },
    { name: 'Ingeniería Pesquera', code: '884' },
    { name: 'Antropología', code: '9687' },
    { name: 'Cine y Audiovisuales', code: '12159' },
    { name: 'Derecho', code: '17866' },
    { name: 'Historia y Patrimonio', code: '108563' },
    { name: 'Profesional en Deporte - Modalidad A distancia', code: '106823' },
    { name: 'Tecnología en Artes Musicales - Modalidad A distancia', code: '109383' },
    { name: 'Tecnología en Educación Física, Recreación y Deporte', code: '15906' },
    { name: 'Enfermería', code: '10062' },
    { name: 'Medicina', code: '10059' },
    { name: 'Odontología', code: '9672' },
    { name: 'Psicología', code: '11805' },
    { name: 'Tecnología en Atención Integral a la Primera Infancia - Modalidad A distancia', code: '109326' }
  ];

  validarFormulario(): void {
    const correoValido = /^[a-zA-Z0-9._%+-]+@unimagdalena\.edu\.co$/;
    const claveSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  
    if (
      !this.name.trim() ||
      !this.email.trim() ||
      !this.selectPrograma ||
      !this.studentCode.trim() ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.messageService.add({ severity: 'error', summary: 'Campos incompletos', detail: 'Todos los campos son obligatorios.' });
      return;
    }
  
    if (!correoValido.test(this.email)) {
      this.messageService.add({ severity: 'error', summary: 'Correo inválido', detail: 'El correo debe ser institucional (@unimagdalena.edu.co).' });
      return;
    }

    if (!/^\d+$/.test(this.studentCode.trim())) {
      this.messageService.add({ severity: 'error', summary: 'Código estudiantil INCORRECTO', detail: 'El código estudiantil debe ser solo numerico y sin espacios' });
      return;
    }

    if (this.studentCode.trim().length !== 10) {
      this.messageService.add({ severity: 'error', summary: 'Código estudiantil INCORRECTO', detail: 'El código estudiantil debe tener 10 DIGITOS' });
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Contraseñas no coinciden', detail: 'Verifica que ambas contraseñas sean iguales.' });
      return;
    }

  
    if (!claveSegura.test(this.password)) {
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'Contraseña débil', 
        detail: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.'
      });
      return;
    }
  
    // Si pasa todas las validaciones
    this.messageService.add({ severity: 'success', summary: 'Registro válido', detail: 'El registro se ha realizado con exito' });
    // Limpiar campos
    this.name = '';
    this.email = '';
    this.selectPrograma = null;
    this.studentCode = '';
    this.password = '';
    this.confirmPassword = '';
  }
  


  
  
}