import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadComponent } from './home/components/file-upload/file-upload.component';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, ButtonModule, FileUploadComponent, InputTextModule],
  templateUrl: './app.component.html',
  
})
export class AppComponent {
  title = 'test';
  value:string = '';
}
