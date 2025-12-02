import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
 selected = new Date()
 chartOptions: Highcharts.Options = {}; // Required
 isSidebarOpen:boolean = true
 constructor(){
  this.chartOptions = {
    chart:{
      type:'bar'
    },
    title:{
      text:'Analysis of Download Recipe Based on Cuisine'
    },
    xAxis:{
      type:'category'
    },
    yAxis:{
      title:{
        text:'Total Download Recipe Count'
      }
    },
    legend:{
      enabled:false
    },
    credits:{
      enabled:false
    },
    series:[
      {
        name:'Cuisine',
        colorByPoint:true,
        type:'bar',
        data:[
          {
            name:'Italian',
            y:30
          }
        ]
      }
    ]
  }
 }

 toggleSidebar(){
  this.isSidebarOpen = !this.isSidebarOpen
 }

}
