import { Component, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { SortEvent } from 'primeng/api';
import { UserService } from '../../../services/user.service';
import { MaterialModule } from '../../../material.module';
import { ModalUserComponent } from '../../../components/modal-user/modal-user.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TeamService } from '../../../services/team.service';
import { getUser } from '../../../Helpers/auth';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  ListUsers: any[] = [];

  user: any = null;

  initialValue: any[] = [];

  isSorted: boolean = false;

  ref: DynamicDialogRef | undefined;
  ListTeams: any[] = [];


  constructor(
    private teamService: TeamService,

    private userService: UserService,
    public dialogService: DialogService,

  ) { }


  ngOnInit() {
    this.user = getUser();

    this.GetTeam();
    this.GetUser();

  }


  GetUser() {
    this.userService.List().subscribe({
      next: (data) => {
        this.ListUsers = data.value;
      }
    })
  }


  customSort(event: any) {

  }

  Register() {
    this.ref = this.dialogService.open(ModalUserComponent, { header: 'Crear nuevo usuario', width: '90%', data: null });
    this.ref.onClose.subscribe(() => {
      this.GetUser();
    });
  }

  Edit(user: any) {
    this.ref = this.dialogService.open(ModalUserComponent, { header: 'Editar usuario', width: '90%', data: user });
    this.ref.onClose.subscribe(() => {
      this.GetUser();
    });
  }


  GetTeam() {
    this.teamService.List().subscribe({
      next: (data) => {
        this.ListTeams = data.value;
      }
    })
  }


}
