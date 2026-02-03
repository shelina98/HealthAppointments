import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { AppointmentService } from '../appointment-service';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointments } from '../models/appointments';
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
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule ],
  templateUrl: './appointment-list-component.html',
  styleUrl: './appointment-list-component.css',
})
export class AppointmentListComponent {

  auth = inject(AuthService)
  appointService = inject(AppointmentService)
  firestore = inject(Firestore)
  user = this.auth.user
  router = inject(Router)

  dialog = inject(MatDialog)

  currentUrl = signal(this.router.url);

  isDoctorSchedule = computed(() => this.currentUrl().includes('/doctor-schedule'));

  // Firestore stream filtered for requested appoint
  private docs$ = collectionData(
    query(collection(this.firestore, 'Appointments'),
     where('status',this.isDoctorSchedule()? 'in':'==', this.isDoctorSchedule()? ['scheduled', 'ongoing']: 'requested'),
     where('doctorId','==',this.user()?.id)),
    { idField: 'id' }
  ) as Observable<Appointments[]>;

  // Signal holding our doctor list

  appoitments = toSignal(this.docs$, { initialValue: [] });


  ngOnInit( ){
    console.log(this.appoitments)
  }


  accept(id:string) {
  this.appointService.confirmAppointment(id)
  }
  decline(id:string) {
  this.appointService.deleteAppointment(id)

  }

  startAppointment(appt:Appointments) {

    // 1. Open the Medical History Dialog first
   this.dialog.open(MedicalHistoryDialogComponent, {
    width: '900px',
    disableClose: true, // Prevent closing without saving
    data: { 
      patientName: appt.patientName,
      patientId: appt.patientId,
      symptoms: appt.symptoms
    }
  });

    this.appointService.startAppointment(appt.id);


  }
}
