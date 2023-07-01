import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { CriarContaComponent } from './usuarios/criar-conta/criar-conta.component';
import { LoginComponent } from './usuarios/login/login.component';
import { EsqueciSenhaComponent } from './usuarios/esqueci-senha/esqueci-senha.component';
import { FormCategoriaComponent } from './categorias/form-categoria/form-categoria.component';
import { ListaCategoriaComponent } from './categorias/lista-categoria/lista-categoria.component';
import { FormProdutoComponent } from './produtos/form-produto/form-produto.component';
import { ListaProdutoComponent } from './produtos/lista-produto/lista-produto.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { FormEnderecoComponent } from './usuarios/enderecos/form-endereco/form-endereco.component';
import { ListaEnderecoComponent } from './usuarios/enderecos/lista-endereco/lista-endereco.component';
import { ListaPedidosComponent } from './pedidos/lista-pedidos/lista-pedidos.component';
import { DetalhePedidoComponent } from './pedidos/detalhe-pedido/detalhe-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    DashboardComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    CriarContaComponent,
    LoginComponent,
    EsqueciSenhaComponent,
    FormCategoriaComponent,
    ListaCategoriaComponent,
    FormProdutoComponent,
    ListaProdutoComponent,
    PerfilComponent,
    FormEnderecoComponent,
    ListaEnderecoComponent,
    ListaPedidosComponent,
    DetalhePedidoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
