import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../../usuarios/shared/usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario: any = {};

  constructor(private usuarioService: UsuarioService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.usuarioService.getDadosUsuario().subscribe(user => {
          this.usuario = user;
        })
      } else {
        this.usuario = {};
      }
    })
  }

  sair() {
    this.usuarioService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
