import { ChartsModule } from 'ng2-charts';
import { UsuarioReportComponent } from './components/usuario-report/usuario-report.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';//fazer requisições ajax post put etc
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { UsuarioAddComponent } from './components/usuario-add/usuario-add.component';
import { NgxMaskModule } from 'ngx-mask' //mascara dos formulário
import { NgxPaginationModule } from 'ngx-pagination'; //paginação
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxCurrencyModule } from 'ngx-currency';
import { OverlayscrollbarsModule } from "overlayscrollbars-ngx";
import { BarChartComponent } from './components/bar-chart/bar-chart.component'

/*export const routes : ModuleWithProviders = RouterModule.forRoot(appRouters);*/

/*export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};
 NgxMaskModule.forRoot(optionsMask) */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioReportComponent,
    BarChartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    OverlayscrollbarsModule,
    HttpInterceptorModule, //nosso service de botar o token no cabeçalho
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false //ao salvar, vai manter a mascara
    }),
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
