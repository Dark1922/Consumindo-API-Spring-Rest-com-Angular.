import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { UsuarioReportComponent } from './components/usuario-report/usuario-report.component';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//faz as rotas dos nosso component
const routes: Routes = [
   //nossa classe do HomeComponent é o nosso home
  //ele chama nosso template html e css
  {path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard]},

  //qnd chamar nosso home vai chamar o loginComponent
  {path: 'login', component: LoginComponent}, //publico n pode ter guardiao

  {path: '', component: LoginComponent},

  //qnd chamar o usuarioList vai chamar o usuario component
  {path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardiaoGuard]},

  //página que vai criar um novo usuário
  {path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]},

  //qnd ele passar um parametro tb na rota de editar
  {path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]},

  {path: 'usuerReport', component: UsuarioReportComponent, canActivate: [GuardiaoGuard]},

  {path: 'chart', component: BarChartComponent, canActivate: [GuardiaoGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    paramsInheritanceStrategy: 'always' //captura parametro das rota primaria tb
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
