import { Component, EmbeddedViewRef, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { UtilService } from '../../services/util.service';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PriorityService } from '../../services/priority.service';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { MaterialModule } from '../../material.module';
import { getUser } from '../../Helpers/auth';

@Component({
  selector: 'app-modaltask',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modaltask.component.html',
  styleUrl: './modaltask.component.css'
})
export class ModaltaskComponent implements OnInit {

  ListUsers: any[] = [];
  ListPriority: any[] = [];
  ListTaskStatus: any[] = [];
  formulario: FormGroup;
  uploadedFiles: string = '';
  imagesUrls: any[] = [];
  minDate: Date;
  user: any = null;

  constructor(
    private priorityService: PriorityService,
    private taskService: TaskService,
    private userService: UserService,
    private utilService: UtilService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
  ) {
    this.minDate = new Date();

    this.formulario = fb.group({
      id_task: [0],
      id_creador: [0],
      id_user: [''],
      id_teams: [''],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      id_Estado: ['', Validators.required],
      id_priority: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      color: ['red',],
      imagen: [''],
    })


    if (config.data) {

      if (this.config.data.TaskId > 0) {
        this.GetUsers(config.data.id_teams)
        this.formulario.patchValue({
          id_user: config.data.id_user,
          id_teams: config.data.id_teams,
          titulo: config.data.Titulo,
          descripcion: config.data.Descripcion,
          id_Estado: config.data.id_estado,
          id_priority: config.data.id_prioridad,
          fechaVencimiento: config.data.FechaVencimiento,
        })
        if (config.data.image) {
          this.uploadedFiles = JSON.parse(config.data.image)
          this.formulario.patchValue({ imagen: JSON.parse(config.data.image) });
        }
      } else {
        this.GetUsers(config.data)

      }


    }

  }



  GetPriority() {
    this.priorityService.List().subscribe({
      next: (data) => {
        this.ListPriority = data.value;
      }
    })
  }

  GetUsers(idTeam: number) {
    this.userService.ListByTeam(idTeam).subscribe({
      next: (data) => {
        this.ListUsers = data.value;
      }
    })
  }

  GetTaskStatus() {
    this.utilService.ListTaskStatus().subscribe({
      next: (data) => {
        this.ListTaskStatus = data.value;
      }
    })
  }

  RegisterTask() {


    if (this.config.data.TaskId > 0) {
      this.formulario.value.id_task = this.config.data.TaskId
      this.taskService.Edit(this.formulario.value).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea Editada ' });
          this.ref.close();
        }
      })
      return;
    }


    this.formulario.value.id_teams = parseInt(this.config.data)
    this.formulario.value.id_creador = this.user?.id

    this.taskService.Register(this.formulario.value).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarea Registrada  ' });
        this.ref.close();
      }
    })
  }

  ngOnInit(): void {
    this.user = getUser();
    this.GetTaskStatus();
    this.GetPriority();
  }

  onUpload(event: any) {
    console.log(event)
  }

  onBasicUploadAuto(event: any) {
    const file = event.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result as string;
      this.formulario.patchValue({ imagen: JSON.stringify(base64String) });
    };
  }


}
