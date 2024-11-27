import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeamService } from '../../../services/team.service';
import { MaterialModule } from '../../../material.module';
import { RouterLink } from '@angular/router';
import { ModalTeamComponent } from '../../../components/modal-team/modal-team.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getUser } from '../../../Helpers/auth';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {

  ListTeams: any[] = [];

  ref: DynamicDialogRef | undefined;
  user: any = null;

  constructor(
    public dialogService: DialogService,

    private teamService: TeamService,

  ) {

  }

  GetTeam() {

    this.teamService.List().subscribe({
      next: (data) => {
        this.ListTeams = data.value;
      }
    })

    /*    if (this.user.id_rol == 1) {
         this.teamService.List().subscribe({
           next: (data) => {
             this.ListTeams = data.value;
           }
         })
         return;
       } */

    /*     this.teamService.ListByUser(getUser().id).subscribe({
          next: (data) => {
            this.ListTeams = data.value;
          }
        }) */
  }

  ngOnInit(): void {
    this.user = getUser();
    this.GetTeam();
  }

  Register() {

    // Detecta el ancho de la ventana
    const screenWidth = window.innerWidth;

    // Ajusta el ancho según el tamaño de la pantalla
    let modalWidth = '30%';  // valor por defecto
    if (screenWidth <= 600) {
      modalWidth = '90%';  // Si la pantalla es más pequeña o igual a 600px
    }

    // Abre el modal con el ancho responsivo
    this.ref = this.dialogService.open(ModalTeamComponent, {
      header: 'Crear nueva tarea',
      width: modalWidth,  // Usamos el valor calculado
      data: null
    });


    this.ref.onClose.subscribe(() => {
      this.GetTeam();
    });
  }

}
