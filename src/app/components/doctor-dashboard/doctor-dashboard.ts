import { Component, inject } from '@angular/core';
import { AppointmentService } from '../../appointment-service';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Appointments } from '../../models/appointments';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../auth/auth-service';


@Component({
  selector: 'app-doctor-dashboard',
  imports: [MatCardModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {


  auth = inject(AuthService)
  appointService = inject(AppointmentService)
  firestore = inject(Firestore)
  user = this.auth.user

  // Firestore stream filtered for requested appoint
  private docs$ = collectionData(
    query(collection(this.firestore, 'Appointments'),
     where('status', '==', 'requested'),
     where('doctorId','==',this.user()?.id)),
    { idField: 'id' }
  ) as Observable<Appointments[]>;

  // Signal holding our doctor list

  appoitments = toSignal(this.docs$, { initialValue: [] });


  ngOnInit( ){
    console.log(this.appoitments)
  }

}
