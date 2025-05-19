import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-dialog-applications',
  imports: [ButtonModule, DialogModule, InputTextModule, EditorModule, FormsModule],
  templateUrl: './company-dialog-applications.component.html',
  styleUrl: './company-dialog-applications.component.css'
})
export class CompanyDialogApplicationsComponent {
  
  name: string = '';
  description: string = '';
  visible: boolean = false;
  
  showDialog() {
    this.visible = true;
  }
}
