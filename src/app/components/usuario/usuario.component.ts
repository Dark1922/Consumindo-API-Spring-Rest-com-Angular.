import { Component, OnInit } from '@angular/core';
import { Profissao } from 'src/app/model/Profissao';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  //vem uma lista de usuári em forma de um array
  usuarios: Array<User> =
  [
    {
      id: 0 , nome: "", login: "", cpf: "", password: "" ,
     email: "",  telefones: [], dataNascimento: '',
      profissao:  new Profissao(), salario: {}, profissaoUser: '',

     },
];
  //variavel nome do tipo string
  nome !: String;
  p: any;
  total: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void { //carrega a lista de  usuario qnd inicia essa url
      this.usuarioService.getUsuarioList()?.subscribe(data => {
      this.usuarios = data.content; //vai vir do backend e vai adicionar na nossa variavel data
      this.total = data.totalElements; //getTotalElements carrega todos
    });
  }

  //invocar somente qnd clicarmos no botão de delete
  deleteUsuario(id: number, index: any) {

    if(confirm('Deseja mesmo remover?')) {

    this.usuarioService.deletarUsuario(id).subscribe(data => {

     this.usuarios.splice(index, 1);/*Remover da Tela */


   //carrega a lista ao ser deletado
   this.usuarioService.getUsuarioList()?.subscribe(data => {
    this.usuarios = data.content;
    this.total = data.totalElements;
      });
    });
    }
  }

  consultarUser() {
    if (this.nome === '' ) {

      this.usuarioService.getUsuarioList().subscribe(data => {
        this.usuarios = data.content; //vai vir do backend e vai adicionar na nossa variavel data
        this.total = data.totalElements; //getTotalElements carrega todos
      });
       }else {

      //nosso retorno vai ser igual a lista que vem da tela
      //consulta user passando a paginação
      this.usuarioService.consultarUser(this.nome).subscribe(data => {
      this.usuarios = data.content; //pega a lista de elemento do spring data
      this.total = data.totalElements; //seta todos elemento
    });
   }

  }

  carregarPagina(pagina: number) {
  if(this.nome !== '') {
    this.usuarioService.consultarUserPorPage(this.nome, (pagina -1)).subscribe(data => {
      this.usuarios = data.content; //pega a lista de elemento do spring data
      this.total = data.totalElements; //seta todos elemento
    });
  }else {
    this.usuarioService.getUsuarioListPage(pagina -1).subscribe(data => {
      this.usuarios = data.content; //vai vir do backend e vai adicionar na nossa variavel data
      this.total = data.totalElements; //getTotalElements carrega todos
  });
  }
}

  imprimeRelatorio() {
    return this.usuarioService.downloadPdfRelatorio();
  }//vai ser chamado da tela html e ele chama o service e outros lugares
}
