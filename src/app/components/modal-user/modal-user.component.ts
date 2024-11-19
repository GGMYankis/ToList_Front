import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css'
})
export class ModalUserComponent implements OnInit {
  formulario: FormGroup;
  ListTeams: any[] = [];
  ListRules: any[] = [];

  constructor(
    private utilService: UtilService,
    private userService: UserService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private teamService: TeamService,

  ) {
    this.formulario = fb.group({
      idUser: [0],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      idRol: [''],
      avatar: [''],
      clave: ['', Validators.required],
      idTeam: [''],
    })


    if (config.data) {
      this.formulario.patchValue({
        ...config.data
      })
    }
  }


  RegisterUser() {

    if (this.config.data) {
      this.formulario.value.idUser = this.config.data.id;
      this.userService.Edit(this.formulario.value).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario Editado ' });
          this.ref.close();
        }
      })
      return;
    }
    this.userService.Register(this.formulario.value).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuario Registrado ' });
        this.ref.close();
      }
    })
  }

  GetTeam() {
    this.teamService.List().subscribe({
      next: (data) => {
        this.ListTeams = data.value;
      }
    })
  }

  GetRules() {
    this.utilService.ListRoles().subscribe({
      next: (data) => {
        this.ListRules = data.value;
      }
    })
  }

  ngOnInit(): void {
    this.GetTeam();
    this.GetRules();
  }

}
