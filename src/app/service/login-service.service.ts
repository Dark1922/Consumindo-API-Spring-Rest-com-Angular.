import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Router } from '@angular/router'; //rotas
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: { login: string; password: string; }) {
    //post manda os dados pro nosso login , json stringify
    //para ele vir em forma de json o login e a senha pra poder fazer o post certo
    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario))
    .subscribe(data => {

      //retorno http retorna apenas o token qnd usuário requisitar o login
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem('token', token);

      //conferindo se o token está vindo que está vindo por parametro 'token'
      //console.info('token: ' + localStorage.getItem('token'));

      //fazer a navegação agora
      this.router.navigate(['home']);
    },
    error => {
      console.error('Erro ao fazer o loign');
      alert('login/Senha está Incorreto!')
    })
  }

  recuperar(login: string) {

    let user = new User();
    user.login = login;
    return this.http.post(AppConstants.getBaseUrlPath + 'recuperar/', user)
    .subscribe(data => {

        //converteu para um json , tratou essa string
     alert(JSON.parse(JSON.stringify(data)).error);//error que está tratando no back-end


    },
    error => {
      console.error('Erro ao Recuperar Acesso');
      alert('Erro ao recuperar Acesso!')
    })

}
}
