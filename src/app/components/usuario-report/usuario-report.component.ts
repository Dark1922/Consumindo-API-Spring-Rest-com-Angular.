import { User } from 'src/app/model/user';
import { UserReport } from './../../model/UserReport';
import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //pega nosso parametro no editar
import { UsuarioService } from 'src/app/service/usuario.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    return date? validarData(date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year : null;

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
    return date? validarData(date.day) + this.DELIMITER + validarData(date.month) +
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
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css'],
  providers: [{provide: NgbDateAdapter, useClass : FormatDateAdapter},
  { provide: NgbDateParserFormatter, useClass: FormataData}]
})
export class UsuarioReportComponent  {

  useReport = new UserReport();
  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) {

   }

   imprimeRelatorio() {
    this.userService.downloadPdfRelatorioParam(this.useReport);

   }





}
