import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'ProjetoAngular';

  //constructor das rota
  constructor (private router: Router) {

  }

  ngOnInit(): void { //executado toda vez que o método for chamado appcomponent

    //se o token de autenticação for nulo ou n ter ele
    if(localStorage.getItem('token') == null ) {

      this.router.navigate(['login']); //vai chamar ele pro login
    }
  }

  public sair() {
    localStorage.clear(); //limpar o token
    this.router.navigate(['login']) //volta pra página de login
  }

  public esconderBarra() {//na página de login vai esconder o navbar false se logo e true se n
    if(localStorage.getItem('token') !== null && localStorage.getItem('token')
     ?.toString().trim() !== null) {

      return false;
  }else {
    return true;
  }
  }
}


