import { Component, OnInit } from '@angular/core';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-ventana',
  templateUrl: './ventana.component.html',
  styleUrls: ['./ventana.component.css']
})
export class VentanaComponent implements OnInit {



  //implementar js en los componentes
  constructor(private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/ventana"]);
  }

  ngOnInit(): void {
  }

}
