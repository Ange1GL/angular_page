import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  templateUrl: './file-upload.component.html',
  imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, HttpClientModule, CommonModule],
    providers: [MessageService]
})
export class FileUploadComponent {
  files = [];

  totalSize: number = 0;

  totalSizePercent: number = 0;

  constructor(private config: PrimeNGConfig, private messageService: MessageService) { }

  choose(event, callback) {
    console.log(event)
    console.log(callback)
    callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
    console.log(event)
    console.log(file)
    console.log(removeFileCallback)
    console.log(index)
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear) {
    console.log(clear)
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event) {
    console.log(event)

    this.files = event.currentFiles;
    this.files.forEach((file: File) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: VoidFunction) {
    callback();
  }

  formatSize(bytes:number) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes as string[];
    if (bytes === 0) {
      return `0 ${sizes[0] as string}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
