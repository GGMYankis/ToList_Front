import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MaterialModule } from '../../material.module';
import { UtilService } from '../../services/util.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal-team',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-team.component.html',
  styleUrl: './modal-team.component.css'
})
export class ModalTeamComponent implements OnInit {

  formulario: FormGroup;
  ListColor: any[] = [];
  ListAdmins: any[] = [];

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private utilService: UtilService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.formulario = fb.group({
      nombre: ['', Validators.required],
      fondo: ['', Validators.required],
      idLeader: ['', Validators.required],
    })
  }

  RegisterTeam() {
    console.log(this.formulario.value)
    this.teamService.Register(this.formulario.value).subscribe({
      next: (data) => {
        this.ref.close();
      }
    })
  }

  GetColor() {
    this.utilService.ListColor().subscribe({
      next: (data) => {
        console.log(data)
        this.ListColor = data.value;
      }
    })
  }

  GetAdmin() {
    this.userService.ListAdmin().subscribe({
      next: (data) => {
        this.ListAdmins = data.value;
      }
    })
  }

  ngOnInit(): void {
    this.GetColor();
    this.GetAdmin();
  }

  changeColor(color: any) {
    this.formulario.patchValue({
      fondo: color.colorName
    })
  }

}
