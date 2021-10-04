  import {
    HttpErrorResponse,
     HttpEvent,
     HttpHandler,
     HttpInterceptor,
     HttpRequest, HttpResponse, HTTP_INTERCEPTORS
     }
  from '@angular/common/http';
  import { Injectable, NgModule } from '@angular/core';
  import { Observable, throwError } from 'rxjs';
  import { catchError, map, tap } from 'rxjs/operators';



  @Injectable() //vai fazer a injeção direta
  export class HeaderInterceptorService implements HttpInterceptor {

    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


      //se ele tiver token vai buscar esse token bearer e o toekn dele asd21d012d
      //e fazer as condição
      if(localStorage.getItem('token') !== null) {

        const token = 'Bearer ' + localStorage.getItem('token');

        //sobrecresvebdi a parte do angular e passar o token no cabeçalho
        //toda vez que fazer uma requisição no servidor esse token vai está junto
        //resgata a condição original req.clone

        const  tokenRequest = req.clone({ //seta no cabeçalho
          headers : req.headers.set('Authorization', token)
        });

        if(req.url.toString().substring(0,14) == ("https://viacep")){
          return next.handle(req).pipe(
              map((event: HttpEvent<any>) => {
                  if (event instanceof HttpResponse) {
                     //console.log( event);
                  }
                  return event;
              }));
      }


        //pipe pra transformar legivel o error
        return next.handle(tokenRequest).pipe(tap((event: HttpEvent<any>) => {
          if(event instanceof HttpResponse && (event.status === 200 || event.status === 201)) {
            console.info('Sucesso na operação');

          }
        })
        , catchError(this.processaError));

    }else { //se não tem o token
      return next.handle(req).pipe(catchError(this.processaError));//retorna passando a requsição original / normal
    }

  }

  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if(error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.message;
    }else {
      if(error.status === 403) {
        errorMessage = 'Acesso expirado: Faça o login novamente';
      }else {
       errorMessage = 'Code: ' + error.error.code + '\nMensagem: ' + error.error.error;
       }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  }

  @NgModule({
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
  ],
  })



  //classe externa pra poder exporta ela e automaticamente ele vai ler
  //toda essa classe
  export class HttpInterceptorModule {}
