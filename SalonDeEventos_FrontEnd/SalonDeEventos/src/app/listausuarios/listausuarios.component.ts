import { Component, HostListener, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { PersonaService } from '../service/persona.service';
import { ActivatedRoute, Router } from '@angular/router'
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../modelo/usuario';
import Swal from 'sweetalert2';
import { AllScriptsService } from '../scripts/all-scripts.service';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {

  usuariosAct: Usuario[] = [];
  usuariosInact: Usuario[] = [];
  busquedaAct: string = "";
  busquedaInAct: string = "";
  bRol: number = 0;
  estado: string = "ACTIVOS";

  constructor(private PersonaService: PersonaService, private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute, private AllScripts: AllScriptsService) {
    AllScripts.Cargar(["default/ventana"]);

  }


  ngOnInit(): void {
    this.listarUsuariosAct();
    this.listarUsuariosInAct();
  }

  listarUsuariosAct(): void {
    this.usuarioService.listarEst(1).subscribe(
      users => this.usuariosAct = users
    );
  }


  busquedaUsuariosAct(): void {
    if (this.busquedaAct) {
      this.usuarioService.buscarUsuarios(this.busquedaAct, 1).subscribe(
        user => {
          this.usuariosAct = user
        }

      );
    } else {
      this.listarUsuariosAct();
    }
  }

  listarUsuariosInAct(): void {

    this.usuarioService.listarEst(0).subscribe(
      users => this.usuariosInact = users
    );

  }

  busquedaUsuariosInact(): void {
    this.usuarioService.buscarUsuarios(this.busquedaInAct, 0).subscribe(
      user => {
        this.usuariosInact = user
      }

    );
  }

  // buscarActivos(event: KeyboardEvent) {
  //   this.busquedaUsuariosAct()
  // }


  eliminar(id: number): void {
    Swal.fire({
      title: `¿Seguro que desea eliminar el usuario?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.actualizarEst(id, 0).subscribe(user => {

          this.listarUsuariosAct();
          this.listarUsuariosInAct();
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Usuario eliminado exitosamente`,
            showConfirmButton: true,
            timer: 1500
          })
        })
        Swal.fire('Saved!', '', 'success')

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  activarCuenta(id: number): void {
    Swal.fire({
      title: `¿Seguro que desea activar esta cuenta?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.actualizarEst(id, 1).subscribe(user => {
          // this.usuarioService.getUsuarios().subscribe(users => 
          //   {
          //     this.usuarios = users
          //   });

          this.listarUsuariosAct();
          this.listarUsuariosInAct();

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Cuenta activada exitosamente`,
            showConfirmButton: true,
            timer: 1500
          })
        })
        Swal.fire('Saved!', '', 'success')

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }


}
