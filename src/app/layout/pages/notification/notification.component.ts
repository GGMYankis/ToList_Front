import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import moment from 'moment';
import { MaterialModule } from '../../../material.module';
import { NotificacionService } from '../../../services/notificacion.service';
import { getUser } from '../../../Helpers/auth';
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
    this.notificacionService.changeStatus(task?.id).subscribe({
      next: (data) => {
        this.getNotification();
      }
    })
  }

  fecha(date: string | null | undefined): string {
    if (!date) return 'Fecha no disponible';
    return moment(date).fromNow();
  }
}
