import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //atributo e valor vamos iniciar vazio
  usuario = {login: '', password: ''}

  //router para fazermos navegação de rotas trabalha com todas rotas redirecionamento
  constructor(private loginService: LoginServiceService, private route: Router) {}

  public login() {
   this.loginService.login(this.usuario);
  }

  ngOnInit(): void {
    //se o tokem for diferente de null e de espaço vazio ele existe
    //ele está funcionando vamos trazer ele direto pra rota home
     if(localStorage.getItem('token') !== null && localStorage.getItem('token')
     ?.toString().trim() !== null) {

      this.route.navigate(['home']);

     }
  }

  public recuperar() {
    this.loginService.recuperar(this.usuario.login);
  }
}
