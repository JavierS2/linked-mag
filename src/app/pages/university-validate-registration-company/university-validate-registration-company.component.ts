import { Component, OnInit } from '@angular/core';
import { SidebarUniversityComponent } from '../../shared/components/sidebar-university/sidebar-university.component';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { SelectModule } from 'primeng/select';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-university-validate-registration-company',
  imports: [SidebarUniversityComponent, MenubarModule, AvatarModule, AvatarModule, MenubarModule, TableModule, ButtonModule,
      InputTextModule, IconFieldModule, InputIconModule, MultiSelectModule, SliderModule,
      SelectModule, ProgressBarModule, TagModule, FormsModule, DatePipe, CommonModule, ],
  templateUrl: './university-validate-registration-company.component.html',
  styleUrl: './university-validate-registration-company.component.css'
})
export class UniversityValidateRegistrationCompanyComponent implements OnInit {

  loading = false;
  visible: boolean = false;

  constructor(private api: ApiService) { }

  companies: any[] = [];

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations() {
    this.loading = true;
    this.api.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data.filter((company: any) => company.statusRegister === 'Pendiente');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener los estudiantes:', err);
        this.loading = false;
      }
    });
  }

  onChangeStatus(NIT: number, status: string): void {
    const newStatus = status;
    this.api.changeCompanyStatus(NIT, newStatus).subscribe({
      next: () => {
        this.companies = this.companies.filter(company => company.NIT !== NIT);
        alert('Registro validado correctamente.');
      },
      error: (err) => {
        console.error('Error al validar el registro:', err);
        alert('Ocurrió un error al validar el registro.');
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

}
