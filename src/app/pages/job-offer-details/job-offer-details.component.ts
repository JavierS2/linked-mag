import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';

import { SidebarStudentComponent } from '../../shared/components/sidebar-student/sidebar-student.component';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { CompanySidebarComponent } from '../../shared/components/company-sidebar/company-sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { JobOffer } from '../../models/job-offer';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


registerLocaleData(localeEsCO, 'es-CO');

@Component({
    selector: 'app-job-offer-details',
    standalone: true,
    templateUrl: 'job-offer-details.component.html',
    styleUrl: 'job-offer-details.component.css',
    imports: [
    CommonModule,
        CompanySidebarComponent,
    AvatarModule,
    MenubarModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    RippleModule,
    TagModule,
    ToastModule,
    
    ],
    providers: [DatePipe, MessageService]
})

export class JobOfferDetailsComponent implements OnInit {

    constructor(private route: ActivatedRoute, private api: ApiService, private datePipe: DatePipe, private messageService: MessageService) {}

    loading = false;
    searchTerm = '';
    offer: JobOffer | null = null;
    statusClass: string = '';
    offerId!: number;
    

    ngOnInit(): void {
        this.offerId = Number(this.route.snapshot.paramMap.get('id'));
        console.log('ID recibido desde la ruta:', this.offerId);
        
        if (isNaN(this.offerId)) {
            console.error('ID inválido en la URL');
            return;
        }// Ajusta el texto exacto a lo que devuelve tu API:

        this.api.getOfferById(this.offerId).subscribe({
            next: (data) => {
                data.fechaPublicacion = this.datePipe.transform(data.date, 'yyyy-MM-dd');
                this.offer = data;

                const status = this.offer?.status?.toLowerCase();
                if (status === 'cerrada') {
                this.statusClass = 'text-red-600';
                } else {
                this.statusClass = 'text-green-600';
                }
            },
            error: (err) => {
                console.error('Error al cargar la oferta:', err);
            }
        });

    }

        postulations = [
        {
            id: 1,
            fullName: 'Daniel Rodríguez',
            studentCode: 202012345,
            date: new Date('2025-05-15T10:00:00'),
            program: 'Ingeniería de Sistemas',
            status: 'Aprobada'
        },
        {
            id: 2,
            fullName: 'Laura Gómez',
            studentCode: 202034567,
            date: new Date('2025-05-14T09:30:00'),
            program: 'Ingeniería Industrial',
            status: 'Pendiente'
        },
        {
            id: 3,
            fullName: 'Carlos Torres',
            studentCode: 202045678,
            date: new Date('2025-05-13T14:15:00'),
            program: 'Administración de Empresas',
            status: 'Rechazada'
        }
    ];

    onChangeStatus(id: number, status: string): void {
        const newStatus = status;
        this.api.changePostulationStatus(id, newStatus).subscribe({
        next: () => {
            this.postulations = this.postulations.filter(postulations => postulations.id !== id);
            this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Registro actualizado correctamente.'
            });
        },
        error: (err) => {
            console.error('Error al validar el registro:', err);
            this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el registro. Por favor, inténtelo de nuevo más tarde.'
            });
        }
        });
    }
    
}