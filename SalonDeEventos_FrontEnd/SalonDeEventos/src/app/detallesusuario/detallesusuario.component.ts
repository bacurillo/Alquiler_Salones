import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { PersonaService } from '../service/persona.service';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../modelo/usuario';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../modelo/persona';
import { Rol } from '../modelo/rol';
import { RolService } from '../service/rol.service';


@Component({
  selector: 'app-detallesusuario',
  templateUrl: './detallesusuario.component.html',
  styleUrls: ['./detallesusuario.component.css']
})
export class DetallesusuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  persona: Persona = new Persona();
  rol: Rol = new Rol();
  roles: Rol[] = [];
  rolSelect: Rol = new Rol;
  accion: string = "";

  sesion: Usuario = new Usuario();
  pass = "";
  confirmarPass = "";



  constructor(private personaService: PersonaService, private usuarioService: UsuarioService, private rolService: RolService,
    private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.cargarAccion();
    this.cargarRoles();
    this.obtenerUsuario();
  }
  cargarRoles(): void {

    this.rolService.getRoles().subscribe(
      rolesArray => {
        for (let rol of rolesArray) {
          this.roles.push(rol)
        }
      }
    );
  }

  obtenerUsuario() {
    // Recuperar el string del localStorage
    const userString = localStorage.getItem('userData');

    // Verificar si el string existe en el localStorage
    if (userString) {
      const login = JSON.parse(userString);
      this.sesion = login;

    }

  }

  cargarAccion(): void {
    this.activatedRoute.params.subscribe(params => {
      this.accion = params['accion']
      console.log(this.accion)
      if (this.accion === 'editar') {
        this.cargarUsu();
      }
    })
  }

  cargarRolUsu(): void {
    this.rol.rolNombre = this.rolSelect.rolNombre;

    for (const rol of this.roles) {
      if (this.rol.rolNombre === rol.rolNombre) {
        this.usuario.rolId = rol;
        break;
      }
    }
  }

  cargarUsu(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.usuarioService.buscarUsu(id).subscribe((usu) => {
          this.usuario = usu
          this.persona = usu.usuPerId
          this.rolSelect = usu.rolId
          console.log("rol= " + this.rolSelect.rolNombre)
        })
      }
    })
  }

  formatDate(date: Date): string {
    // Formatea la fecha como 'yyyy-MM-dd' para que coincida con el formato del campo de entrada
    // console.log(date)
    const nacimiento: Date = new Date(date);
    const year = nacimiento.getFullYear();
    const month = ('0' + (nacimiento.getMonth() + 1)).slice(-2);
    const day = ('0' + nacimiento.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateDate(event: any): void {
    // Convierte la cadena de fecha del campo de entrada en un objeto Date
    this.usuario.usuPerId.perFechaNacimiento = new Date(event.target.value);
  }


  update(): void {
    if (this.validacionesUpdate()) {
      if (this.newPass()) {
        console.log("usu=- " + this.usuario.usuId)
        console.log("per=- " + this.persona.perId)
        Swal.fire({
          title: `¿Esta seguro de modificar sus datos?`,
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
            this.personaService.update(this.persona.perId, this.persona).subscribe(
              response => {
                this.persona.perId = response.perId;
                this.usuario.usuPerId = this.persona;

                this.cargarRolUsu()

                console.log("usuROL= " + this.usuario.rolId.rolNombre)

                this.usuarioService.update(this.usuario.usuId, this.usuario).subscribe(response => {

                  console.log(response)

                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sus datos se actualizaron correctamente',
                    showConfirmButton: true


                    // timer: 3500
                  }).then(() => {
                    if (this.sesion.usuId === response.usuId) {
                      const usertString = JSON.stringify(response);
                      localStorage.removeItem('userData');
                      localStorage.setItem('userData', usertString);
                      this.router.navigate(["perfiluser"]);
                    } else {
                      this.router.navigate(["listausu"]);

                    }
                  });
                });

              }
            )

          } else if (result.isDenied) {
            Swal.fire('Verifique sus datos antes de cambiarlos', '', 'info')
          }
        })
      }

    }
  }

  newPass(): boolean {
    let ban: boolean = true;
    if (this.pass) {

      if (this.confirmarPass.length === 0) {
        this.toastr.error('Debe confirmar su contraseña', '', {
          timeOut: 3500
        });
        ban = false;
      } else {
        if (this.pass === this.confirmarPass) {
          this.usuario.usuContrasena = this.pass;
        } else {
          this.toastr.error('La contraseña no coincide con su confirmación', '', {
            timeOut: 3500
          });
          ban = false;
        }
      }

    }
    return ban;
  }

  registrar(): void {
    this.usuario.usuContrasena = this.pass;
    if (this.validacionesRegistro()) {
      console.log("VALIDADO")
      this.usuario.usuEstado = 1;
      this.personaService.crearPersona(this.persona).subscribe(
        response => {
          this.persona.perId = response.perId;
          this.usuario.usuPerId = this.persona;

          this.cargarRolUsu()

          console.log("usuROL= " + this.usuario.rolId.rolNombre)

          this.usuarioService.crearUsuario(this.usuario).subscribe(response => {

            console.log(response)

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro exitoso',
              showConfirmButton: true
              // timer: 3500
            }).then(() => {
              this.router.navigate(["gestionuser"]);
            });
          });
        }
      )
    }
  }

  validacionesUpdate(): boolean {
    // const fechaActual = new Date();
    // console.log(fechaActual);
    let tiempo: number = 4000;

    let ban: boolean = true;

    if (this.persona.perApellido.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
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

    if (this.persona.perNombre.length === 0) {
      this.toastr.error('Debe ingresar su nombre', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perTelefono.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
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
    }


    return ban;
  }

  validacionesRegistro(): boolean {
    // const fechaActual = new Date();
    // console.log(fechaActual);
    let tiempo: number = 4000;

    let ban: boolean = true;

    if (this.persona.perApellido.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
        timeOut: tiempo
      });
      ban = false;
    }
    // if (this.persona.perApellido.length === 0) {
    //   this.toastr.error('Debe ingresar su apellido', '', {
    //     timeOut: tiempo
    //   });
    //   ban = false;
    // }

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

    if (this.persona.perNombre.length === 0) {
      this.toastr.error('Debe ingresar su nombre', '', {
        timeOut: tiempo
      });
      ban = false;
    }

    if (this.persona.perTelefono.length === 0) {
      this.toastr.error('Debe ingresar su apellido', '', {
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
    // console.log("HOY" + fechaActual)
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
