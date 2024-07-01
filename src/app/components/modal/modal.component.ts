import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  Type,
   Input
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal-service.service';
import { ApiService } from '../../services/service-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProjectFormComponent } from '../forms/project-form/project-form.component';
import { TaskFormComponent } from '../forms/task-form/task-form.component';
import { ListFormComponent } from '../forms/list-form/list-form.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    TaskFormComponent,
    ListFormComponent,
    ProjectFormComponent,
  ],
})
export class ModalComponent implements OnInit {
  public formType: string = 'projectform';
  isOpen = false;
  @Input() currentId: number = 0;
  @Input() data: any = {};
  @Input() projectid: number = 0;

  public modalTitle: string = '';

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.watch().subscribe((status) => {
      this.isOpen = status === 'open';
    });

    this.modalService.watchAction().subscribe((ActionItemIdList) => {
      this.formType = ActionItemIdList.action; 
      this.currentId = ActionItemIdList.Id;
      this.data = ActionItemIdList.data;
      if ('projectid' in ActionItemIdList) {
        this.projectid = ActionItemIdList.projectid;
      }
    });

    console.log('Current ID in modal', this.currentId);
    console.log('Data in modal', this.data);
  }

  requireNonEmpty(control: FormControl): { [key: string]: any } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { requireNonEmpty: true };
  }

  closeModal() {
    this.modalService.close();
  }

  onSubmit() {
    console.log('Form submitted');
    // Additional logic here to handle the form submission
  }
}
