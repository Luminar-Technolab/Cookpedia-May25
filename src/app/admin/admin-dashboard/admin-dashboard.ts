import { Component, inject } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../../services/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  router = inject(Router)
  api = inject(ApiService)
  selected = new Date()
  chartOptions: Highcharts.Options = {}; // Required
  isSidebarOpen:boolean = true
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  notification:number = 0

 constructor(){
  if(localStorage.getItem("chart")){
    const chartData = JSON.parse(localStorage.getItem("chart")||"")
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
        data: chartData
      }
    ]
  }
  }
 }
 ngOnInit(){
  this.getUser()
  this.getRecipes()
  this.getDownloads()
  this.getNotification()
  this.api.getChartData()
 }

 getUser(){
  this.api.getAllUsersAPI().subscribe((res:any)=>{
    this.userCount = res.length
  })
 }

 getRecipes(){
  this.api.getAllRecipesAPI().subscribe((res:any)=>{
    this.recipeCount = res.length
  })
 }

 getDownloads(){
  this.api.getAllDownloadsAPI().subscribe((res:any)=>{
    this.downloadCount = res.map((item:any)=>item.count).reduce((acc:any,curr:any)=>acc+curr)
  })
 }

 getNotification(){
  this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
    this.notification = res.filter((item:any)=>item.status=="pending").length
  })
 }

 toggleSidebar(){
  this.isSidebarOpen = !this.isSidebarOpen
 }

 logout(){
  sessionStorage.clear()
  this.router.navigateByUrl('/')
 }

}
