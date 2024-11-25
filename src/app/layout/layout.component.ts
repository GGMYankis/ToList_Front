import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { deleteToken, getUser } from '../Helpers/auth';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  userAutenticate: any = null;
  activeLink: string = '';

  Countnotificaciones: number = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private notificacionService: NotificacionService
  ) {
  }

  addClassToParent(event: any) {
    let arrowParent = event.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu"); // Corrige clasList a classList
  }


  setActive(link: string): void {
    this.activeLink = link;
  }

  close() {
    document.querySelector('.sidebar')?.classList.toggle('close')
  }
  close2() {
    document.querySelector('.sidebar')?.classList.toggle('close')
  }
  openNotification() {
    document.querySelector('.notificaciones')?.classList.toggle('open')
  }

  ngOnInit(): void {
    this.userAutenticate = getUser();

    this.getNotification();

  }


  logout() {
    deleteToken();
  }

  getNotification() {
    this.notificacionService.List(getUser().id).subscribe({
      next: (data) => {
        this.Countnotificaciones = data.value.length

      }
    })
  }

}
