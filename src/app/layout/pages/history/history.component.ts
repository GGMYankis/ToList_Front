import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { getUser } from '../../../Helpers/auth';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  NameTeam: string = "";
  ListOfCompletedTasks: any[] = [];
  user: any = null;
  nameTeam: string = ''

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
  ) {

  }


  ngOnInit(): void {

    this.user = getUser();
    this.List();
  }

  List() {


    this.taskService.ListMyTask(this.user.id).subscribe({
      next: (data) => {
        console.log(data)
        this.nameTeam = data.value.tareasCompletadas[0].NombreEquipo
        this.ListOfCompletedTasks = data.value.tareasCompletadas;
      }
    })

  }
  esFechaVencida(fechaVencimiento: string): boolean {
    const hoy = new Date();
    const fecha = new Date(fechaVencimiento);
    return fecha < hoy;
  }




}
