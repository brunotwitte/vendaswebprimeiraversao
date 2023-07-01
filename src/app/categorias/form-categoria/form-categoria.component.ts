import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.scss']
})
export class FormCategoriaComponent implements OnInit {
  formCategoria: FormGroup;
  key: string;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private categoriaService: CategoriaService, private toastr: ToastrService) { }

  ngOnInit() {
    this.criarFormulario();

    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.categoriaService.getByKey(key).subscribe((categoria: any) => {
        subscribe.unsubscribe();

        this.key = categoria.key;
        this.formCategoria.setValue({ nome: categoria.nome });
      })
    }
  }

  get nome() { return this.formCategoria.get('nome'); }

  criarFormulario() {
    this.key = null;
    this.formCategoria = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formCategoria.valid) {
      if (this.key) {
        this.categoriaService.update(this.formCategoria.value, this.key)
      } else {
        this.categoriaService.insert(this.formCategoria.value);
      }
      this.toastr.success('Categoria salva com sucesso');
    }
  }
}
