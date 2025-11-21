import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Turno } from '../models/turno.model';
import { ApiService } from './api.service';

// Backend API model from /turnos
interface TurnoApi {
  id_turno: number;
  id_usuario: number;
  id_zona: number;
  fecha_hora_inicio: string; // Comes as string from JSON
  fecha_hora_fin: string; // Comes as string from JSON
  estado: 'Asignado' | 'Completado' | 'Cancelado';
}

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  constructor(private api: ApiService) {}

  // Mapping function from API to UI model
  private mapFromApi(api: TurnoApi): Turno {
    return {
      id: `T-${api.id_turno}`,
      // Example title, as it's not in the backend model
      titulo: `Turno ${api.estado}`, 
      zona: `Zona ${api.id_zona}`, // Example mapping
      inicio: api.fecha_hora_inicio,
      fin: api.fecha_hora_fin,
      guardiaId: api.id_usuario,
    };
  }

  getAll(): Observable<Turno[]> {
    return this.api.get<TurnoApi[]>('turnos').pipe(
      map(apiTurnos => apiTurnos.map(this.mapFromApi))
    );
  }
}