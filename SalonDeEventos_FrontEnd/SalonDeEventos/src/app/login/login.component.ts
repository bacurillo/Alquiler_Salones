import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { PersonaService } from '../service/persona.service';
import { Router } from '@angular/router'
import { Usuario } from '../modelo/usuario';
import { UsuarioService } from '../service/usuario.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { RolService } from '../service/rol.service';
import { Rol } from '../modelo/rol';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolService,
    private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
  }

  usuariologin: string = "";
  passlogin: string = "";
  estadoLogin = 0;
  // usuarioLogin:Usuario=new Usuario;

  login(): void {
    if (this.validacionesLogin()) {
      this.usuarioService.usuarioExiste(this.usuariologin).subscribe(existe => {
        console.log("boolean= " + existe);
        if (existe) {
          this.usuarioService.login(this.usuariologin, this.passlogin).subscribe(login => {
            if (login) {
              this.estadoLogin = login.usuEstado;

              if (this.validarEstado()) {

                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Bienvenido',
                  showConfirmButton: false,
                  timer: 1000
                }).then(() => {
                  const usertString = JSON.stringify(login);

                  localStorage.setItem('userData', usertString);

                  if (login.rolId.rolId === 1) {
                    this.router.navigate(["admin"]);
                  }
                  if (login.rolId.rolId === 2) {
                    this.router.navigate(["emp"]);
                  }
                  if (login.rolId.rolId === 3) {
                    this.router.navigate(["menu"]);
                  }
                });

              }

            } else {
              this.toastr.error('', 'Contraseña incorrecta', {
                timeOut: 3000
              });
            }

          });
        } else {
          this.toastr.error('', 'Nombre de usuario incorrecto', {
            timeOut: 3000
          });
        }
      });
    }
  }


  validarEstado(): boolean {
    if (this.estadoLogin === 0) {
      this.toastr.error('Consulte con el administrador', 'Usuario inactivo', {
        timeOut: 4000
      });
      return false;
    }
    return true;
  }
  validacionesLogin(): boolean {
    // const fechaActual = new Date();
    // console.log(fechaActual);
    let tiempo: number = 2500;

    let ban: boolean = true;

    if (this.usuariologin.length === 0) {
      this.toastr.error('Ingrese su nombre de usuario', '', {
        timeOut: tiempo
      });
      ban = false;
    }
    if (this.passlogin.length === 0) {
      this.toastr.error('Ingrese su contraseña', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    return ban;
  }
  ////////////REGISTRO///////////////////////////////////////


  // personaId: Persona = new Persona();
  usuario: Usuario = new Usuario();
  confirmarPass = "";
  persona: Persona = new Persona();
  rol: Rol = new Rol();

  registrar(): void {
    if (this.validacionesRegistro()) {
      this.usuario.usuEstado = 1;
      this.personaService.crearPersona(this.persona).subscribe(
        response => {
          this.persona.perId = response.perId;
          this.usuario.usuPerId = this.persona;

          this.rolService.getRol(3).subscribe(rol => {
            this.rol.rolId = rol.rolId;
            this.usuario.rolId.rolId = rol.rolId;

            this.usuarioService.crearUsuario(this.usuario).subscribe(response => {

              console.log(response)

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro exitoso',
                showConfirmButton: true
                // timer: 3500
              }).then(() => {
                location.reload();
              });
            });

          });
        }
      )
    }
  }

  validacionesRegistro(): boolean {

    let tiempo: number = 4000;

    let ban: boolean = true;

    if (this.persona.perApellido.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
        timeOut: tiempo
      });
      ban = false;
    }
    if (this.persona.perDireccion.length === 0) {
      this.toastr.error('Debe ingresar su direccion', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perNombre.length === 0) {
      this.toastr.error('Debe ingresar su nombre', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perCorreo.length === 0) {
      this.toastr.error('Debe ingresar su correo', '', {
        timeOut: tiempo
      });
      ban = false;
    } else {
      const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regexCorreo.test(this.persona.perCorreo)) {
        this.toastr.error('Correo invalido', '', {
          timeOut: tiempo
        });
        ban = false;
      }
    }


    //edad
    let fechaActual = new Date();
    let edadMinima = 18;


    if (this.calcularEdad() < edadMinima) {
      ban = false;
      this.toastr.error('Debe ser mayor de edad para registrarse', '', {
        timeOut: 3000
      });
    }

    if (this.persona.perCedula.length === 0) {
      this.toastr.error('Debe ingresar su cédula', '', {
        timeOut: tiempo
      });
      ban = false;
    } else {
      this.personaService.cedulaRegistra(this.persona.perCedula).subscribe(existe => {
        if (!existe) {
          this.toastr.error('El número de cédula que ingreso ya se encuentra registrado', '', {
            timeOut: tiempo
          });
          ban = false;
        } else {
          if (!this.validarCedula(this.persona.perCedula)) {
            this.toastr.error('El número de cédula que ingreso es incorrecto o no es una cédula ecuatoriana', '', {
              timeOut: tiempo
            });
            ban = false;
          }
        }
      })
    }

    if (this.persona.perTelefono.length === 0) {
      this.toastr.error('Debe ingresar su telefono', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.usuario.usuContrasena.length === 0) {
      this.toastr.error('Debe ingresar su contraseña', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.usuario.usuNombreUsuario.length === 0) {
      this.toastr.error('Debe ingresar su nombre de usuario', '', {
        timeOut: tiempo
      });
      ban = false;
    } else {
      this.usuarioService.usuarioExiste(this.usuario.usuNombreUsuario).subscribe(existe => {

        if (existe) {
          this.toastr.error('Este usuario ya existe', '', {
            timeOut: tiempo
          });
          ban = false;
        }
      });
    }

    if (this.confirmarPass.length === 0) {
      this.toastr.error('Debe confirmar su contraseña', '', {
        timeOut: tiempo
      });
      ban = false;
    } else {
      if (this.confirmarPass !== this.usuario.usuContrasena) {
        this.toastr.error('Las 2 contraseñas tienen que coincidir', '', {
          timeOut: tiempo
        });
        ban = false;
      }
    }

    return ban;
  }


  validarCedula(cedula: string): boolean {
    // Verificar si la cédula tiene 10 dígitos numéricos
    if (!/^\d{10}$/.test(cedula)) {
      return false;
    }

    // Obtener los dígitos de la cédula como números
    const digitos = cedula.split('').map(Number);

    // Extraer los dígitos en posiciones pares e impares
    const pares = [digitos[1], digitos[3], digitos[5], digitos[7]];
    const impares = [digitos[0], digitos[2], digitos[4], digitos[6], digitos[8]];

    // Multiplicar los dígitos en posiciones impares por 2 y restar nueve si el resultado es mayor a nueve
    for (let i = 0; i < impares.length; i++) {
      impares[i] *= 2;
      if (impares[i] > 9) {
        impares[i] -= 9;
      }
    }

    // Sumar los dígitos en posiciones pares y los resultados de las operaciones en posiciones impares
    const sumaImpares = impares.reduce((sum, digit) => sum + digit, 0);
    const sumaPares = pares.reduce((sum, digit) => sum + digit, 0);

    // Calcular el total de la suma
    const totalSuma = sumaImpares + sumaPares;

    // Obtener el módulo 10 de la suma total
    const modulo = totalSuma % 10;

    // Calcular el dígito verificador
    const digitoVerificador = modulo === 0 ? 0 : 10 - modulo;

    // Comparar el dígito verificador calculado con el último dígito de la cédula
    return digitoVerificador === digitos[9];
  }

  calcularEdad(): number {
    console.log("nacimiento" + this.persona.perFechaNacimiento)
    const fechaActual: Date = new Date();
    console.log("HOY" + fechaActual)
    const anioActual: number = fechaActual.getFullYear();
    const mesActual: number = fechaActual.getMonth() + 1;
    const diaActual: number = fechaActual.getDate();

    const nacimiento: Date = new Date(this.persona.perFechaNacimiento);
    const anioNacimiento: number = nacimiento.getFullYear();
    const mesNacimiento: number = nacimiento.getMonth() + 1;
    const diaNacimiento: number = nacimiento.getDate() + 1;
    // console.log("nacimiento" + nacimiento)

    let edad: number = anioActual - anioNacimiento;

    // Verificar si aún no ha cumplido años en el presente año
    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }
    // console.log("EDAD" + edad)

    return edad;
  }

  numeros(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-', ',', 'Backspace', 'Delete', 'Tab'];
    const inputKey = event.key;

    if (!allowedKeys.includes(inputKey)) {
      event.preventDefault();
    }
  }
}
