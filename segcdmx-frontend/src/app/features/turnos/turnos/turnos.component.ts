import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Turno } from '../../../core/models/turno.model';
import { TurnosService } from '../../../core/services/turnos.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, DatePipe],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnosComponent {
  readonly days = Array.from({ length: 31 }, (_, i) => i + 1);
  readonly guardiasDisponibles = [
    { nombre: 'Hugo García', estado: 'Disponible' },
    { nombre: 'María León', estado: 'Asignado' },
    { nombre: 'Carlos Ruiz', estado: 'De descanso' },
  ];
  turnos: Turno[] = [];
  selectedTurnoId: string | null = null;
  selectedDate: number | null = null;

  constructor(
    private turnosService: TurnosService,
    private toastService: ToastService,
  ) {
    this.turnosService.getAll().subscribe((turnos) => (this.turnos = turnos));
  }

  selectTurno(id: string): void {
    this.selectedTurnoId = id;
  }

  assignToDay(day: number): void {
    if (!this.selectedTurnoId) {
      this.toastService.push('Selecciona un turno para asignar.', 'warning');
      return;
    }
    this.selectedDate = day;
    this.toastService.push(
      `Turno ${this.selectedTurnoId} asignado al día ${day} de octubre.`,
      'success',
    );
  }
}
