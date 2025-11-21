import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Turno } from '../models/turno.model';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  private readonly turnos: Turno[] = [
    {
      id: 'T-01',
      titulo: 'Turno Matutino',
      zona: 'Zona A',
      inicio: '2024-10-10T06:00:00Z',
      fin: '2024-10-10T14:00:00Z',
    },
    {
      id: 'T-02',
      titulo: 'Turno Vespertino',
      zona: 'Zona B',
      inicio: '2024-10-10T14:00:00Z',
      fin: '2024-10-10T22:00:00Z',
    },
    {
      id: 'T-03',
      titulo: 'Turno Nocturno',
      zona: 'Zona C',
      inicio: '2024-10-10T22:00:00Z',
      fin: '2024-10-11T06:00:00Z',
    },
  ];

  getAll(): Observable<Turno[]> {
    return of(this.turnos).pipe(delay(150));
  }
}
