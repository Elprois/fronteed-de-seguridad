import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Incidente } from '../models/incidente.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class IncidentesService {
  private incidentes: Incidente[] = [
    {
      id: 'INC-001',
      fechaHora: '2025-11-20T08:32:00Z',
      tipo: 'IA',
      descripcion: 'Movimiento sospechoso detectado en acceso principal.',
      estado: 'Pendiente',
      zona: 'Centro Histórico',
      guardia: 'Luis P.',
    },
    {
      id: 'INC-002',
      fechaHora: '2025-11-20T07:18:00Z',
      tipo: 'Manual',
      descripcion: 'Reporte de ruido elevado en zona comercial.',
      estado: 'Validado',
      zona: 'Polanco',
      guardia: 'María C.',
    },
    {
      id: 'INC-003',
      fechaHora: '2025-11-19T22:45:00Z',
      tipo: 'IA',
      descripcion: 'Perímetro abierto en bodega 12.',
      estado: 'Resuelto',
      zona: 'Vallejo',
      guardia: 'Sistema Automático',
    },
  ];

  constructor(private api: ApiService) {}

  getAll(): Observable<Incidente[]> {
    return of(this.incidentes).pipe(delay(300));
  }

  getById(id: string): Observable<Incidente | undefined> {
    const incidente = this.incidentes.find((item) => item.id === id);
    return of(incidente).pipe(delay(200));
  }

  create(payload: Incidente): Observable<Incidente> {
    this.incidentes = [...this.incidentes, payload];
    return of(payload).pipe(delay(200));
  }

  update(id: string, changes: Partial<Incidente>): Observable<Incidente | undefined> {
    this.incidentes = this.incidentes.map((incidente) =>
      incidente.id === id ? { ...incidente, ...changes } : incidente,
    );
    return this.getById(id);
  }
}
