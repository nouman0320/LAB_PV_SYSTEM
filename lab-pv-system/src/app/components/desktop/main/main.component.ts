import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/serrvices/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  constructor(public dataService: DataService) {
   
   }

  ngOnInit(): void {
    
  }

}
