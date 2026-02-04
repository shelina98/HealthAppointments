import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { AppointmentService } from '../../services/appointment-service';
import { Firestore } from '@angular/fire/firestore';
import { Appointments } from '../../models/appointments';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MedicalHistoryDialogComponent } from '../medical-history-dialog-component/medical-history-dialog-component';

@Component({
  selector: 'app-appointment-list-component',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatDialogModule],
  templateUrl: './appointment-list-component.html',
  styleUrl: './appointment-list-component.css',
})
export class AppointmentListComponent {
  auth = inject(AuthService);
  appointService = inject(AppointmentService);
  firestore = inject(Firestore);
  router = inject(Router);

  currentUrl = signal(this.router.url);
  isDoctorSchedule = computed(() => {
    const r = this.currentUrl().includes('doctor-schedule');
    return r;
  });

  user = this.auth.user;

  dialog = inject(MatDialog);

  appoitments = toSignal(
    this.appointService.getAppointments(this.user()?.id || '', this.isDoctorSchedule()),
    { initialValue: [] },
  );

  accept(id: string) {
    this.appointService.confirmAppointment(id);
  }

  decline(id: string) {
    this.appointService.deleteAppointment(id);
  }

  startAppointment(appt: Appointments) {
    // 1. Open the Medical History Dialog first
    this.dialog.open(MedicalHistoryDialogComponent, {
      width: '900px',
      disableClose: true, // Prevent closing without saving
      data: {
        patientName: appt.patientName,
        patientId: appt.patientId,
        symptoms: appt.symptoms,
        appoitmentID: appt.id,
        docName: this.user()?.name,
        docId: this.user()?.id,
      },
    });

    this.appointService.startAppointment(appt.id);
  }
}
