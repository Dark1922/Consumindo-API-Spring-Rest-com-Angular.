export class AppConstants {

  //base do nosso servidor a url padrão
  public static get baseServidor(): string {
    return 'apirestspringakx.herokuapp.com/';
  }

  //url login
  public static get baseLogin(): string {
    return this.baseServidor + 'cursospringrestapi/login';
  }

  public static get baseUrl(): string {
    return this.baseServidor + 'cursospringrestapi/usuario/'}

    public static get getBaseUrlPath() : string {return this.baseServidor + 'cursospringrestapi/'}


}
