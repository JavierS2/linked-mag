import { Component } from '@angular/core';
import { SidebarStudentComponent } from '../../shared/components/sidebar-student/sidebar-student.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-student-applications',
  imports: [SidebarStudentComponent, AvatarModule, MenubarModule],
  templateUrl: './student-applications.component.html',
  styleUrl: './student-applications.component.css'
})
export class StudentApplicationsComponent {
      
}
