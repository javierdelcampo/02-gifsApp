import { GifsService } from './../../gifs/services/gifs.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent {
   
  constructor( private gifsService: GifsService ) {}

  get historial() {
    return this.gifsService.historial;
  }

  buscar(elemento: string) {
    console.log("Buscando:" + elemento);
    this.gifsService.buscarGifs(elemento);
  }

}
