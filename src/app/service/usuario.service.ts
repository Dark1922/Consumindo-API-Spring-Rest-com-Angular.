import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { UserReport } from '../model/UserReport';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //http para fazer requisição ajax put delete ..
  constructor(private http: HttpClient) {

  }

  getUsuarioList(): Observable<any> {
    //método de listar a base da url do nosso backend pra fazer os métodos com o
    //usuario, vai fazer uma requisição get
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getUsuarioListPage(pagina: number): Observable<any> {

    return this.http.get<any>(AppConstants.baseUrl + 'page/' + pagina);
  }

  deletarUsuario(id: number) : Observable<any> {

    //localhost:8080/cursospringrestapi/usuario/id e a resposta texto
    // se recebesse um status ok
    return this.http.delete(AppConstants.baseUrl + id, {responseType: 'text'});
  }

  consultarUser(nome: String) : Observable<any> {
    //nossa url pra os métodos com usuarop + nosso endpoint e o que vai ser consultado
    //http://localhost:8080/cursospringrestapi/usuario/buscarPorNome/jhon
    return this.http.get(AppConstants.baseUrl + "buscarPorNome/" + nome);

  }

  consultarUserPorPage(nome: String, page: number) : Observable<any> {
    //consultar usuário por páginaçãop com nome

    return this.http.get(AppConstants.baseUrl + "buscarPorNome/" + nome + '/page/' + page);

  }

  getUsuarioDados(id: any) : Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id );
    //busca os dados do usuario pelo id pela rota pra fazer o editar
  }

  salvarUsuario(user: any) : Observable<any>{
    //rota post de criar usuário passando o usuario por parametro
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user: any) : Observable<any>{
    //rota put para atualizar usuario
    return this.http.put<any>(AppConstants.baseUrl + user.id, user);
    //http://localhost:8080/cursospringrestapi/usuario/id
  }

  removerTelefone(id: number) : Observable<any> {
    return this.http.delete<any>(AppConstants.baseUrl + 'removerTelefone/' + id)
  }

  userAutenticado() {
    if(localStorage.getItem('token') !== null && localStorage.getItem('token')
     ?.toString().trim() !== null) {

      return true;
  }else {

    return false;
  }
}

getProfissaoList() : Observable<any>{
    return this.http.get<any>(AppConstants.getBaseUrlPath + 'profissao/')
}//localhost:8080/cursospringrestapi/profissao


downloadPdfRelatorio() {
  return this.http.get(AppConstants.baseUrl + 'relatorio', {responseType : 'text'}).subscribe(data => {
    //angula 8  document.querySelector('iframe').src = data;

    //angular 12, src = midia imagem etc , data = os dados do pdf
    const iframe = document.querySelector('iframe');
    iframe?.setAttribute('src', data);
  });
}
downloadPdfRelatorioParam(userReport: UserReport) {//post envio de dados
  return this.http.post(AppConstants.baseUrl + 'relatorio/', userReport ,
  {responseType : 'text'}).subscribe(data => {
    const iframe = document.querySelector('iframe');
    iframe?.setAttribute('src', data);
  });
}

carregarGrafico(): Observable<any> {
  return this.http.get(AppConstants.baseUrl + 'grafico')
}

}
