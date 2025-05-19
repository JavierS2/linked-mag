import { Component, NgModule } from '@angular/core';
import { SidebarStudentComponent } from '../../shared/components/sidebar-student/sidebar-student.component';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-student-offers',
  imports: [SidebarStudentComponent, AvatarModule, MenubarModule, FormsModule],
  templateUrl: './student-offers.component.html',
  styleUrl: './student-offers.component.css'
})
export class StudentOffersComponent {
      searchTerm = '';
      ofertas = [
        { nombre: 'Practicante Ing. Sistemas', ciudad: 'Santa Marta' },
        { nombre: 'Desarrollador Junior', ciudad: 'Barranquilla' },
        // ...más ofertas
      ];

      searchOffer(){
        
      }
}
