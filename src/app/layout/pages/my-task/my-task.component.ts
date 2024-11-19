import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';
import { ModaltaskComponent } from '../../../components/modaltask/modaltask.component';

@Component({
  selector: 'app-my-task',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.css'
})
export class MyTaskComponent implements OnInit {
  ListOfCompletedTasks: any[] = [];
  ListOfProgressTasks: any[] = [];
  ListOfPendingTasks: any[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialogService: DialogService,
    private taskService: TaskService,
    private userService: UserService,
  ) {

  }

  List() {
    this.taskService.ListMyTask(2).subscribe({
      next: (data) => {
        this.ListOfCompletedTasks = data.value.tareasCompletadas;
        this.ListOfProgressTasks = data.value.tareasEnProgreso;
        this.ListOfPendingTasks = data.value.tareasPendientes
      }
    })
  }


  viewTask(task: any) {
    this.ref = this.dialogService.open(ModaltaskComponent, { height: '70%', data: task });
    this.ref.onClose.subscribe(() => {
      this.List();
    });
  }

  showModal() {
    this.ref = this.dialogService.open(ModaltaskComponent, { header: 'Select a Product', height: '70%', data: null });
    this.ref.onClose.subscribe(() => {
      this.List();
    });
  }


  ngOnInit(): void {
    this.List();
  }
}
