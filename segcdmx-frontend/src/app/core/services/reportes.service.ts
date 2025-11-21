import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  generateResumen(fechaInicio: string, fechaFin: string): Observable<{ resumen: string }> {
    return of({
      resumen: `Informe generado del ${fechaInicio} al ${fechaFin}.`,
    }).pipe(delay(200));
  }

  download(tipo: 'pdf' | 'excel'): Observable<string> {
    return of(`Descargando reporte en formato ${tipo.toUpperCase()}`).pipe(delay(150));
  }
}
