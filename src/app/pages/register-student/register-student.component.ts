import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { NavBarHomeComponent } from "../../shared/components/nav-bar-home/nav-bar-home.component";
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [NavBarHomeComponent, ButtonModule, FloatLabelModule, FormsModule, TextareaModule, 
            DropdownModule, SelectModule, ToastModule, MenuModule, DividerModule, PasswordModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})

export class RegisterStudentComponent {
  constructor(private messageService: MessageService) {}
  name: string = '';
  email: string = '';
  selectPrograma: any;
  studentCode: string = '';
  password: string = '';
  confirmPassword: string = '';
  academicPrograms: any[] = [
    { name: 'Administración de Empresas', code: '19781' },
    { name: 'Antropología', code: '9687' },
    { name: 'Cine y Audiovisuales', code: '12159' },
    { name: 'Contaduría Pública', code: '11958' },
    { name: 'Derecho', code: '17866' },
    { name: 'Economía', code: '882' },
    { name: 'Enfermería', code: '10062' },
    { name: 'Historia y Patrimonio', code: '108563' },
    { name: 'Ingeniería Agronómica', code: '885' },
    { name: 'Ingeniería Ambiental y Sanitaria', code: '11221' },
    { name: 'Ingeniería Civil', code: '7112' },
    { name: 'Ingeniería de Sistemas', code: '3147' },
    { name: 'Ingeniería Electrónica', code: '20409' },
    { name: 'Ingeniería Industrial', code: '9853' },
    { name: 'Ingeniería Marino-Costera', code: '116006' },
    { name: 'Ingeniería Pesquera', code: '884' },
    { name: 'Licenciatura en Artes', code: '109379' },
    { name: 'Licenciatura en Ciencias Naturales y Educación Ambiental', code: '108279' },
    { name: 'Licenciatura en Educación Campesina y Rural', code: '108301' },
    { name: 'Licenciatura en Educación Infantil', code: '108967' },
    { name: 'Licenciatura en Etnoeducación', code: '109380' },
    { name: 'Licenciatura en Informática', code: '11420' },
    { name: 'Licenciatura en Lenguas Extranjeras con Énfasis en Inglés', code: '108302' },
    { name: 'Licenciatura en Literatura y Lengua Castellana', code: '108278' },
    { name: 'Licenciatura en Matemáticas', code: '108277' },
    { name: 'Licenciatura en Preescolar', code: '11410' },
    { name: 'Licenciatura en Química', code: '109378' },
    { name: 'Licenciatura en Tecnología', code: '109090' },
    { name: 'Medicina', code: '10059' },
    { name: 'Negocios Internacionales', code: '12008' },
    { name: 'Odontología', code: '9672' },
    { name: 'Psicología', code: '11805' }
];

  validarFormulario(): void {
    const correoValido = /^[a-zA-Z0-9._%+-]+@unimagdalena\.edu\.co$/;
    const claveSegura = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@?#\$%\^&\*])(?=.{8,})/;
  
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