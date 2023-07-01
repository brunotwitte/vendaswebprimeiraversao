import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsuarioService } from '../shared/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  formProfile: FormGroup;
  private file: File = null;
  imgUrl: string = '';
  filePath: string = '';

  constructor(
    private formBuilder: FormBuilder, private afAuth: AngularFireAuth,
    private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit() {
    this.criarFormulario();
    this.carregarDadosUsuario();
  }

  carregarDadosUsuario() {
    const userSubscribe = this.afAuth.authState.subscribe((user) => {
      userSubscribe.unsubscribe();

      if (user) {
        const userData = this.usuarioService.getDadosUsuario().subscribe((dadosUsuario: any) => {
          userData.unsubscribe();

          this.formProfile.setValue({
            nome: dadosUsuario.nome,
            telefone: dadosUsuario.telefone || '',
            cpf: dadosUsuario.cpf || '',
            img: ''
          });

          this.imgUrl = dadosUsuario.img || '';
          this.filePath = dadosUsuario.filePath || '';
        });
      } else {
        this.toastr.error('Ocorreu algum erro ao buscar os dados do usuário. Por favor atualize a página.')
      }
    })
  }

  get nome() { return this.formProfile.get('nome'); }
  get telefone() { return this.formProfile.get('telefone'); }
  get cpf() { return this.formProfile.get('cpf'); }

  criarFormulario() {
    this.file = null;
    this.imgUrl = '';
    this.filePath = null;
    this.formProfile = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      img: ['']
    });
  }

  upload(event: any) {
    if (event.target.files.length) {
      this.file = event.target.files[0];
    } else {
      this.file = null;
    }
  }

  removerImg() {
    this.usuarioService.removeImg(this.filePath);
    this.imgUrl = '';
    this.filePath = '';
    this.file = null;
  }

  onSubmit() {
    if (this.formProfile.valid && this.afAuth.auth.currentUser) {

      let promiseProfile = [this.usuarioService.updateProfile(this.formProfile.value)];
      if (this.file) {
        promiseProfile.push(this.usuarioService.uploadImg(this.file));
      }

      Promise.all(promiseProfile)
        .then(() => {
          this.toastr.success('Perfil alterado com sucesso');
          this.carregarDadosUsuario();
        });
    }
  }
}
