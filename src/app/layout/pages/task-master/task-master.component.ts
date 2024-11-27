import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';

import { UserService } from '../../../services/user.service';
import { ModaltaskComponent } from '../../../components/modaltask/modaltask.component';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { getUser } from '../../../Helpers/auth';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

@Component({
  selector: 'app-task-master',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './task-master.component.html',
  styleUrl: './task-master.component.css'
})
export class TaskMasterComponent implements OnInit {

  availableProducts: any[] | undefined;
  selectedProducts: any[] | undefined;
  draggedProduct: any | undefined | null;

  ListOfCompletedTasks: any[] = [];
  ListOfComment: any[] = [];
  ListOfProgressTasks: any[] = [];
  ListOfPendingTasks: any[] = [];
  ListTask: any[] = [];
  NameTeam: string = "";
  IdTeam: number = 0;
  taskSelected: any = null;
  loading: boolean = false;
  ref: DynamicDialogRef | undefined;

  formulario: FormGroup;
  formularioRevisada: FormGroup;
  user: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialogService: DialogService,
    private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder,
  ) {

    this.formulario = fb.group({
      comentario: ['', Validators.required]
    })
    this.formularioRevisada = fb.group({
      revisada: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.NameTeam = this.activatedRoute.snapshot.params['name']
    this.IdTeam = this.activatedRoute.snapshot.params['id']
    this.user = getUser();
    this.List();
  }

  List() {


    if (this.user.id_rol == 1) {
      console.log('entro admin')
      this.taskService.List(this.activatedRoute.snapshot.params['id']).subscribe({
        next: (data) => {
          this.ListOfCompletedTasks = data.value.tareasCompletadas;
          this.ListOfPendingTasks = data.value.tareasPendientes;
        }
      })
    } else {

      if (this.IdTeam != this.user.id_team) {
        this.taskService.ListUserTaskOtherTeam(this.user.id).subscribe({
          next: (data) => {
            console.log(data.value)
            this.ListOfCompletedTasks = data.value.tareasCompletadas;
            this.ListOfPendingTasks = data.value.tareasPendientes;
          }
        })
        return
      }


      this.taskService.ListMyTask(this.user.id).subscribe({
        next: (data) => {
          this.ListOfCompletedTasks = data.value.tareasCompletadas;
          this.ListOfPendingTasks = data.value.tareasPendientes;
        }
      })
    }

  }

  showModal() {
    // Detecta el ancho de la ventana
    const screenWidth = window.innerWidth;

    // Ajusta el ancho según el tamaño de la pantalla
    let modalWidth = '30%';  // valor por defecto
    if (screenWidth <= 600) {
      modalWidth = '90%';  // Si la pantalla es más pequeña o igual a 600px
    }

    // Abre el modal con el ancho responsivo
    this.ref = this.dialogService.open(ModaltaskComponent, {
      header: 'Crear nueva tarea',
      width: modalWidth,  // Usamos el valor calculado
      data: this.IdTeam
    });

    // Suscripción para cerrar el modal y actualizar la lista
    this.ref.onClose.subscribe(() => {
      this.List();
    });
  }


  viewTask(task: any) {
    this.ref = this.dialogService.open(ModaltaskComponent, { height: '70%', data: task });
    this.ref.onClose.subscribe(() => {
      this.List();
    });
  }

  dragStart(product: any) {
    this.draggedProduct = product;
  }

  drop(tipo: string, idNewStatus: number) {

    const request =
    {
      "id_status": idNewStatus,
      "id_task": this.draggedProduct.TaskId
    }

    this.taskService.ChangeStatus(request).subscribe({
      next: (data) => {
        this.List();
      }
    })
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  esFechaVencida(fechaVencimiento: string): boolean {
    const hoy = new Date();
    const fecha = new Date(fechaVencimiento);
    return fecha < hoy;
  }


  changeStatusMovil(task: any) {

    const request = {
      "id": 0,
      "idUsuario": task?.id_creador,
      "idUsuarioNotificador": task?.id_user,
      "idTask": task?.TaskId,
      "id_status": 3
    }


    this.taskService.ChangeStatus(request).subscribe({
      next: (data) => {
        this.List();
      }
    })
  }

  viewTaskMovil(task: any) {
    //  this.loading = true
    this.taskService.ViewComment(task.TaskId).subscribe({
      next: (data) => {
        this.ListOfComment = data.value;

        /*   setTimeout(() => {
            this.loading = false
          }, 1000) */
      }
    })

    this.taskSelected = task;
    document.querySelector('.view-task-movil')?.classList.toggle('see')
  }


  ListComment() {
    this.taskService.ViewComment(this.taskSelected.TaskId).subscribe({
      next: (data) => {
        this.ListOfComment = data.value;

        /*   setTimeout(() => {
            this.loading = false
          }, 1000) */
      }
    })
  }

  RegisterComment() {


    const request = {
      "idUser": this.user?.id,
      "idTask": this.taskSelected?.TaskId,
      "comentario": this.formulario.value.comentario
    };

    this.taskService.RegisterComment(request).subscribe({
      next: (data) => {
        this.ListComment();

        this.formulario.reset();

      }
    })
  }

  closeTaskMovil() {
    document.querySelector('.view-task-movil')?.classList.toggle('see')
  }

  RegisterRevisada() {
    console.log(this.taskSelected)

    this.taskService.Revisada(this.taskSelected?.TaskId).subscribe({
      next: (data) => {
        this.taskSelected.revisada = true;
      }
    })
  }



  fecha(date: string | null | undefined): string {
    if (!date) return 'Fecha no disponible';
    return moment(date).fromNow();
  }

}
