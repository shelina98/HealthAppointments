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


@Component({
  selector: 'app-appointment-list-component',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule, ],
  templateUrl: './appointment-list-component.html',
  styleUrl: './appointment-list-component.css',
})
export class AppointmentListComponent {

  auth = inject(AuthService)
  appointService = inject(AppointmentService)
  firestore = inject(Firestore)
  user = this.auth.user
  router = inject(Router)

  currentUrl = signal(this.router.url);

  isDoctorSchedule = computed(() => this.currentUrl().includes('/doctor-schedule'));

  // Firestore stream filtered for requested appoint
  private docs$ = collectionData(
    query(collection(this.firestore, 'Appointments'),
     where('status', '==', this.isDoctorSchedule()? 'scheduled': 'requested'),
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
  startAppointment(id:string) {

  }
}
