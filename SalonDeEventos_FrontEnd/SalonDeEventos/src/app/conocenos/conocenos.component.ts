import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent implements OnInit{

  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/conocenos"]);
  }

  ngOnInit(): void {
  }

}
