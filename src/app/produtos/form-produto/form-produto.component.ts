import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../shared/produto.service';
import { CategoriaService } from 'src/app/categorias/shared/categoria.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrls: ['./form-produto.component.scss']
})
export class FormProdutoComponent implements OnInit {
  formProduto: FormGroup;
  key: string;
  categorias: Observable<any[]>;

  private file: File = null;
  imgUrl: string = '';
  filePath: string = '';

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private produtoService: ProdutoService,
    private categoriaService: CategoriaService, private toastr: ToastrService) { }

  ngOnInit() {
    this.criarFormulario();
    this.categorias = this.categoriaService.getAll();

    let key = this.route.snapshot.paramMap.get('key');
    if (key) {
      const subscribe = this.produtoService.getByKey(key).subscribe((produto: any) => {
        // mostrar sem isso para a pessoa entender
        subscribe.unsubscribe();

        this.key = produto.key;
        this.formProduto.setValue({
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          categoriaKey: produto.categoriaKey,
          categoriaNome: produto.categoriaNome,
          img: ''
        });

        this.imgUrl = produto.img || '';
        this.filePath = produto.filePath || '';
      })
    }
  }

  get nome() { return this.formProduto.get('nome'); }
  get descricao() { return this.formProduto.get('descricao'); }
  get preco() { return this.formProduto.get('preco'); }
  get categoriaKey() { return this.formProduto.get('categoriaKey'); }
  get categoriaNome() { return this.formProduto.get('categoriaNome'); }

  criarFormulario() {
    this.key = null;
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: ['', Validators.required],
      categoriaKey: ['', Validators.required],
      categoriaNome: [''],
      img: ['']
    });

    this.file = null;
    this.imgUrl = '';
    this.filePath = '';
  }

  setCategoriaNome(categorias: any) {
    if (categorias && this.formProduto.value.categoriaKey) {
      const categoriaNome = categorias[0].text;
      this.categoriaNome.setValue(categoriaNome);
    } else {
      this.categoriaNome.setValue('');
    }
  }

  upload(event: any) {
    if (event.target.files.length) {
      this.file = event.target.files[0];
    } else {
      this.file = null;
    }
  }

  removerImg() {
    this.produtoService.removeImg(this.filePath, this.key);
    this.imgUrl = '';
    this.filePath = '';
  }

  onSubmit() {
    if (this.formProduto.valid) {
      let result: Promise<{}>;

      if (this.key) {
        result = this.produtoService.update(this.formProduto.value, this.key);
      } else {
        result = this.produtoService.insert(this.formProduto.value);
      }

      if (this.file) {
        result.then((key: string) => {
          this.produtoService.uploadImg(key, this.file);
          this.criarFormulario();
        });
      } else {
        this.criarFormulario();
      }

      this.toastr.success('Produto salvo com sucesso');
    }
  }
}
