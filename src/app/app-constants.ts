export class AppConstants {

  public static get baseServidor(): string { return "https://api-spring-rest-marcus.herokuapp.com/" }

  public static get baseLogin(): string {return this.baseServidor + "springrestapi/login"}

  public static get baseUrl(): string {return this.baseServidor + "springrestapi/usuario/"}

  public static get getBaseUrlPath() : string {return this.baseServidor + 'springrestapi/'}

  }
