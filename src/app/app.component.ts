import { Component } from '@angular/core';
import { AfiliadoService } from './servicios/afiliado.service';

interface Afiliaciones {
  id: number;
  nombre: string;
  nacimiento: string;
  direccion: string;
  telefono: string;
  ips: string;
  genero: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'afiliados-front';

  countries: string[] = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú', 'Uruguay'];
  filteredCountries: string[] = [];
  selectedCountry: string = '';

  generos = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
    { label: 'Otro', value: 'O' }
  ];
  afiliaciones: Afiliaciones[] = [];
  afiliacion: Afiliaciones = {
    id: 0,
    nombre: '',
    nacimiento: '',
    direccion: '',
    telefono: '',
    ips: '',
    genero: '',
  };
  mostrarForm = false;
  esNuevo = false;

  constructor(private afiliadoService: AfiliadoService) {
    this.inicializar();
  }

  inicializar(): void {
    this.afiliadoService.obtenerTodos().subscribe({
      next: (data: any) => {
        this.afiliaciones = data;
      },
    });
  }

  agregar() {
    this.afiliacion = {
      id: 0,
      nombre: '',
      nacimiento: '',
      direccion: '',
      telefono: '',
      ips: '',
      genero: '',
    };
    this.mostrarForm = true;
    this.esNuevo = true;
  }

  editar(obj: Afiliaciones) {
    this.afiliacion = obj;
    this.mostrarForm = true;
    this.esNuevo = false;
  }

  eliminar(obj: Afiliaciones) {
    this.afiliadoService.eliminar(obj.id).subscribe({
      next: (data: any) => {
        this.inicializar();
      },
    });
  }

  guardar() {
    if (this.esNuevo) {
      this.afiliadoService.guardar(this.afiliacion).subscribe({
        next: (data: any) => {
          this.inicializar();
          this.mostrarForm = false;
        },
      });
    } else {
      this.afiliadoService
        .actualizar(this.afiliacion, this.afiliacion.id)
        .subscribe({
          next: (data: any) => {
            this.inicializar();
            this.mostrarForm = false;
          },
        });
    }
  }

  cancelar() {
    this.mostrarForm = false;
  }
}
