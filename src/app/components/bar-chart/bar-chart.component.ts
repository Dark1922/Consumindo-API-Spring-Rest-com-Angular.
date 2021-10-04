import { UserChart } from './../../model/UserChart';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})


export class BarChartComponent implements OnInit   {

    //nosso service
  constructor(private usuarioService: UsuarioService) { }
  userChart = new UserChart();

  ngOnInit(): void {
    this.usuarioService.carregarGrafico().subscribe(data => {
      //retorno do carregarGrafico que vai vir do banco de dados

        this.userChart = data;

        //nomes
        this.barChartLabels = this.userChart.nome.split(',');

        //this para declarar com o chart debaixo , salarios
        let arraySalario = JSON.parse('[' + this.userChart.salario + ']')
       this.barChartData = [
          { data: arraySalario, label: 'Salário Usuário' }
        ];
    });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels!: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' }
  ];

}
