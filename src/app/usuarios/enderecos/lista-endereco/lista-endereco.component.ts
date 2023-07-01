import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EnderecoService } from '../shared/endereco.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-lista-endereco',
  templateUrl: './lista-endereco.component.html',
  styleUrls: ['./lista-endereco.component.scss']
})
export class ListaEnderecoComponent implements OnInit {
  enderecos: Observable<any[]>;

  constructor(private enderecoService: EnderecoService, private toastr: ToastrService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    const subscribe = this.afAuth.authState.subscribe(user => {
      subscribe.unsubscribe();
      if (user) {
        this.enderecos = this.enderecoService.getAll();
      }
    });
  }

  remover(key: string) {
    this.enderecoService.remove(key)
    .then(() => {
      this.toastr.success('Endereço excluído com sucesso');
    })
    .catch((error => {
      this.toastr.error('Erro ao excluir o endereço');
    }));
  }

}
