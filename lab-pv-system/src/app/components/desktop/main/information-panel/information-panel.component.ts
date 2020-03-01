import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/serrvices/data.service';

@Component({
  selector: 'app-information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.css']
})
export class InformationPanelComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

}
