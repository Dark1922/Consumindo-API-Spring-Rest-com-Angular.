import { Observable } from 'rxjs';
import { Telefone } from './../../model/telefone';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //pega nosso parametro no editar
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/Profissao';


@Injectable()
export class FormatDateAdapter implements NgbDateAdapter<string>{

  readonly DELIMITER = '/';

  //pega string e retorna pra tela que o modelo entende
  fromModel(value: string | null): NgbDateStruct | null {

    if(value) {//pega o objeto data quebra e torna um objeto legivel
      let date = value.split(this.DELIMITER)
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }

    }
   return null;
  }
  //pega uma data estruturada e retorna em string
  toModel(date: NgbDateStruct | null): string | null {//estrutura de data ou null string en null tb
    return date? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;

  }

}


@Injectable() //evitar erros
export class FormataData extends NgbDateParserFormatter {

  readonly DELIMITER =  '/'; // 00/00/0000 delimitador com barras pra data

  //pega o json da data que vem por padrão do  datapicker
  parse(value: string): NgbDateStruct | null {

    if(value) {
      let date = value.split(this.DELIMITER) //quebrando a barra em 3 espaço

      return {//transformando a data em numeros inteiro e passando as posição
        day: parseInt(date[0], 10), //10 é os numero padrão
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }//pega o objeto data quebra e torna um objeto legivel

    }

    return null;
  }

  //formata para uma data legível para ser salvo
  format(date: NgbDateStruct | null): string {

    return date? validarData(date.day) + this.DELIMITER + validarData(date.month) +
    this.DELIMITER + date.year : '';

    // : se não vai retorna vázio , passando os formato de data com delimitador
    //concatenando
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date? date.day + this.DELIMITER + date.month +
    this.DELIMITER + date.year : null;
}

}
function validarData(valor: any) {
  //se o valor da string foi diferente de vazio e menor ou igual a 9
  if(valor.toString !== '' && parseInt(valor) <= 9) {
      return '0' + valor; //vai retorna o valor com um 0 pra data fica certa
  }
  return valor; //vai retorna o valor original de for maior 10 ou maior
}
@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateAdapter, useClass : FormatDateAdapter},
  { provide: NgbDateParserFormatter, useClass: FormataData},]
})
export class UsuarioAddComponent implements OnInit {

  //profissao: { ..preencher as propriedades de profissao } usuario etc
  usuario = {} as User; //nosso modelo do usuario

  telefone = {} as Telefone; //instanciações


  //profissoes!: Profissao[]; || Array<Profissao> //variavel de profissao
  profissoes!: Observable<Profissao[]>

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit(): void {

    //vai pegar o id que está editando
   let id = this.routeActive.snapshot.paramMap.get('id');

    if(id != null) {

      this.userService.getUsuarioDados(id).subscribe(data => {
        this.usuario = data;
        console.info(this.usuario);
      });
    }

    //parte da proffisão com id
    /*this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;

     });

    this.profissoes = this.userService.getProfissaoList();
console.log(this.profissoes)
*/
  }

  salvarUser() {
    //atualizando
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
      this.userService.updateUsuario(this.usuario).subscribe(data => {

        this.novo();
        console.info("chamou update");
      });
    } else { //salvando
      this.userService.salvarUsuario(this.usuario).subscribe(data =>{
        this.novo();
        console.info("chamou save");
      });
    }
  }

  deletarTelfone(id: number, i: number) {
  //um telefone que n ta no banco de daddos só aparecendo na tela vai remover ele
    if(id == null) { //n tem id
      this.usuario.telefones.splice(i,1);
      return;
    }


    if(id !== null && confirm('Deseja realmente remover?')) {

      //requisição ajax
    this.userService.removerTelefone(id).subscribe(data => {

     //vai remover apenas um elemento que é um indice
     this.usuario.telefones.splice(i, 1);

      console.info('telefone removido');
    })
  }
}

  addFone() {
    if(this.usuario.telefones === undefined) {
      //se a lista tiver indefinida ou n instanciada. agente instancia a lista pra n da erro
      this.usuario.telefones = new Array<Telefone>();
    }
    //lista de telefone adicionando esse novo telefone na tela
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone(); //caso queira adicionar um segundo telefone
    //deixa instanciado
  }

  novo() {
    this.usuario = new User(); //chama um novo usuário limpa tela
    this.telefone = new Telefone();
  }




}
