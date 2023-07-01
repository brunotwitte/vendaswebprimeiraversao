import { DetalhePedidoComponent } from './pedidos/detalhe-pedido/detalhe-pedido.component';
import { ListaPedidosComponent } from './pedidos/lista-pedidos/lista-pedidos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { AuthGuard } from './usuarios/shared/auth.guard';
import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { LoginComponent } from './usuarios/login/login.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';
import { ListaCategoriaComponent } from './categorias/lista-categoria/lista-categoria.component';
import { FormCategoriaComponent } from './categorias/form-categoria/form-categoria.component';
import { ListaProdutoComponent } from './produtos/lista-produto/lista-produto.component';
import { FormProdutoComponent } from './produtos/form-produto/form-produto.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { ListaEnderecoComponent } from './usuarios/enderecos/lista-endereco/lista-endereco.component';
import { FormEnderecoComponent } from './usuarios/enderecos/form-endereco/form-endereco.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },

      { path: 'pedidos', component: ListaPedidosComponent },
      { path: 'pedidos/detalhe/:key', component: DetalhePedidoComponent },

      { path: 'categorias', component: ListaCategoriaComponent },
      { path: 'categorias/nova', component: FormCategoriaComponent },
      { path: 'categorias/editar/:key', component: FormCategoriaComponent },

      { path: 'produtos', component: ListaProdutoComponent },
      { path: 'produtos/novo', component: FormProdutoComponent },
      { path: 'produtos/editar/:key', component: FormProdutoComponent },

      { path: 'usuario/perfil', component: PerfilComponent },

      { path: 'usuario/enderecos', component: ListaEnderecoComponent },
      { path: 'usuario/enderecos/novo', component: FormEnderecoComponent },
      { path: 'usuario/enderecos/editar/:key', component: FormEnderecoComponent },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'criar-conta', component: CriarContaComponent },
      { path: 'esqueci-senha', component: EsqueciSenhaComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
