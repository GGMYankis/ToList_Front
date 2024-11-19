import { Component, OnInit } from '@angular/core';
import { getUser } from '../../../../Helpers/auth';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotificacionService } from '../../../../services/notificacion.service';
import { MaterialModule } from '../../../../material.module';
import * as moment from 'moment';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  userAutenticate: any = null;

  notificaciones: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private notificacionService: NotificacionService
  ) {
  }


  ngOnInit(): void {
    this.userAutenticate = getUser();

    this.getNotification()
  }


  getNotification() {
    this.notificacionService.List(getUser().id).subscribe({
      next: (data) => {
        console.log(data)
        this.notificaciones = data.value
      }
    })
  }

  viewTask(task: any) {
    console.log(task)
    /*     this.notificacionService.changeStatus(task?.id).subscribe({
          next: (data) => {
            this.getNotification();
          }
        }) */
  }
}
