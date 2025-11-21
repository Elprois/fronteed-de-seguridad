import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CamarasService } from '../../../core/services/camaras.service';
import { CamaraCardComponent } from '../../../shared/components/camara-card/camara-card.component';

@Component({
  selector: 'app-camaras',
  standalone: true,
  imports: [NgFor, CamaraCardComponent, AsyncPipe, NgClass],
  templateUrl: './camaras.component.html',
  styleUrl: './camaras.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CamarasComponent {
  readonly camaras$ = this.camarasService.getAll();
  gridSize: 2 | 3 | 4 = 3;

  constructor(private camarasService: CamarasService) {}

  setGrid(size: 2 | 3 | 4): void {
    this.gridSize = size;
  }
}
