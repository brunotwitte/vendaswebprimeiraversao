import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaService } from '../shared/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.scss']
})
export class ListaCategoriaComponent implements OnInit {
  categorias: Observable<any[]>;

  constructor(private categoriaService: CategoriaService, private toastr: ToastrService) { }

  ngOnInit() {
    this.categorias = this.categoriaService.getAll();
  }

  remover(key: string) {
    this.categoriaService.remove(key)
      .catch((mensagem: string) => {
        this.toastr.error(mensagem);
      });
  }

}
