import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PersonalService } from '../../../core/services/personal.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PrimaryButtonComponent } from '../../../shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../../shared/components/secondary-button/secondary-button.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-personal-nuevo',
  standalone: true,
  imports: [
    CardComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './personal-nuevo.component.html',
  styleUrl: './personal-nuevo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalNuevoComponent {
  showManualForm = false;
  showModal = false;
  lastNameCreated = '';

  readonly guardiaForm = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    rol: ['Guardia', Validators.required],
    certificaciones: [''],
    estado: ['Activo', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private personalService: PersonalService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  iniciarEscaneo(): void {
    this.toastService.push('Simulación de escaneo iniciada.', 'info');
  }

  mostrarFormulario(): void {
    this.showManualForm = true;
  }

  registrar(): void {
    if (this.guardiaForm.invalid) {
      this.guardiaForm.markAllAsTouched();
      return;
    }
    const { nombre, email, rol, certificaciones, estado } = this.guardiaForm.getRawValue();
    this.personalService.create({
      id_usuario: Date.now(),
      nombre,
      email,
      rol,
      estado: estado as 'Activo' | 'Inactivo',
      certificaciones: certificaciones
        ? certificaciones.split(',').map((cert) => cert.trim())
        : [],
    });

    this.lastNameCreated = nombre;
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
    this.router.navigateByUrl('/personal');
  }
}
