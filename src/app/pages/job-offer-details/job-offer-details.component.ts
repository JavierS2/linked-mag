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

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private datePipe: DatePipe,
        private messageService: MessageService
    ) {}

    loading = false;
    searchTerm = '';
    offer: JobOffer | null = null;
    statusClass: string = '';
    offerId!: number;
    allPostulations: any[] = [];
    postulations: any[] = [];

    ngOnInit(): void {
        this.offerId = Number(this.route.snapshot.paramMap.get('id'));
        console.log('ID recibido desde la ruta:', this.offerId);

        if (isNaN(this.offerId)) {
            console.error('ID inválido en la URL');
            return;
        }

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

                // Cargar todas las postulaciones y filtrar por la oferta
                this.loadAllPostulations();
            },
            error: (err) => {
                console.error('Error al cargar la oferta:', err);
            }
        });
    }

    loadAllPostulations(): void {
        this.loading = true;
        this.api.getAllPostulations().subscribe({
            next: (data) => {
                this.allPostulations = data;
                this.filterPostulationsByOffer();
                this.loading = false;
            },
            error: (err) => {
                console.error('Error al cargar postulaciones:', err);
                this.loading = false;
            }
        });
    }

    filterPostulationsByOffer(): void {
        this.postulations = this.allPostulations.filter(
            (p: any) => p.offerId === this.offerId
        );
    }

    onChangeStatus(id: number, status: string): void {
        // Mapea el texto del botón al valor esperado por el backend
        let backendStatus = status;
        if (status === 'Aprobada') backendStatus = 'Aceptada';
        if (status === 'Rechazada') backendStatus = 'Rechazada';

        this.api.updatePostulation(id.toString(), { status: backendStatus }).subscribe({
            next: () => {
                this.postulations = this.postulations.filter(postulation => postulation.id !== id);
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