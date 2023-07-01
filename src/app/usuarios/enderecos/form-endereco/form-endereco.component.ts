import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnderecoService } from '../shared/endereco.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.scss']
})
export class FormEnderecoComponent implements OnInit {
  formEndereco: FormGroup;
  key: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService,
    private enderecoService: EnderecoService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.criarFormulario();

    const subscribe = this.afAuth.authState.subscribe(user => {
      subscribe.unsubscribe();
      if (user) {
        let key = this.route.snapshot.paramMap.get('key');
        if (key) {
          const subscribe = this.enderecoService.getByKey(key).subscribe((endereco: any) => {
            subscribe.unsubscribe();

            this.key = endereco.key;
            this.formEndereco.setValue({
              cep: endereco.cep,
              logradouro: endereco.logradouro,
              numero: endereco.numero,
              complemento: endereco.complemento,
              bairro: endereco.bairro
            });
          })
        }
      }
    });
  }

  criarFormulario() {
    this.key = null;
    this.formEndereco = this.formBuilder.group({
      cep: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: ['']
    });
  }

  onSubmit() {
    if (this.formEndereco.valid) {
      let result: Promise<{}>;
      if (this.key) {
        result = this.enderecoService.update(this.formEndereco.value, this.key);
      } else {
        result = this.enderecoService.insert(this.formEndereco.value);
      }

      result
        .then(() => {
          this.toastr.success('Endereço salvo com sucesso');
          if (!this.key) {
            this.criarFormulario();
          }
        })
        .catch(() => {
          this.toastr.error('Erro ao salvar o endereço');
        });
    }
  }
}
