import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoService } from '../shared/produto.service';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.scss']
})
export class ListaProdutoComponent implements OnInit {
  produtos: Observable<any[]>;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtos = this.produtoService.getAll();
  }

  remover(key: string, filePath: string) {
    this.produtoService.remove(key, filePath);
  }
}
