import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private readonly personalSubject = new BehaviorSubject<Usuario[]>([
    {
      id_usuario: 1,
      nombre: 'María Camacho',
      email: 'mcamacho@segcdmx.mx',
      rol: 'Supervisora',
      estado: 'Activo',
      certificaciones: ['DRON', 'IA'],
    },
    {
      id_usuario: 2,
      nombre: 'Luis Pérez',
      email: 'lperez@segcdmx.mx',
      rol: 'Guardia',
      estado: 'Activo',
      certificaciones: ['CPR'],
    },
    {
      id_usuario: 3,
      nombre: 'Ana Torres',
      email: 'atorres@segcdmx.mx',
      rol: 'Guardia',
      estado: 'Inactivo',
      certificaciones: ['Primeros auxilios'],
    },
  ]);

  getAll(): Observable<Usuario[]> {
    return this.personalSubject.asObservable().pipe(delay(150));
  }

  getById(id: number): Observable<Usuario | undefined> {
    return this.getAll().pipe(map((list) => list.find((user) => user.id_usuario === id)));
  }

  create(payload: Usuario): Observable<Usuario> {
    const current = this.personalSubject.value;
    this.personalSubject.next([...current, payload]);
    return of(payload).pipe(delay(200));
  }

  update(id: number, changes: Partial<Usuario>): Observable<Usuario | undefined> {
    const updated = this.personalSubject.value.map((user) =>
      user.id_usuario === id ? { ...user, ...changes } : user,
    );
    this.personalSubject.next(updated);
    return this.getById(id);
  }

  filterByStatus(status: Usuario['estado'] | 'Todos'): Observable<Usuario[]> {
    return this.getAll().pipe(
      map((list) => (status === 'Todos' ? list : list.filter((user) => user.estado === status))),
    );
  }
}
