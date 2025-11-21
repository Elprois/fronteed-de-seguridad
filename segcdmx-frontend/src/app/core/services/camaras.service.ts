import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Camara } from '../models/camara.model';

@Injectable({
  providedIn: 'root',
})
export class CamarasService {
  private camaras: Camara[] = Array.from({ length: 12 }).map((_, index) => ({
    id: `C-${(index + 1).toString().padStart(2, '0')}`,
    nombre: `C-${(index + 1).toString().padStart(2, '0')}`,
    ubicacion: ['Acceso Principal', 'Lobby', 'Perímetro', 'Estacionamiento'][index % 4],
    urlImagen: `https://picsum.photos/seed/segcdmx-${index}/400/300`,
    tieneAlerta: index % 5 === 0,
    estado: index % 7 === 0 ? 'Sin señal' : 'Operativa',
  }));

  getAll(): Observable<Camara[]> {
    return of(this.camaras).pipe(delay(150));
  }

  getById(id: string): Observable<Camara | undefined> {
    return of(this.camaras.find((cam) => cam.id === id)).pipe(delay(150));
  }
}
