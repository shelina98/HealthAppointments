import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/users';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-patient-dashboard',
  imports: [CommonModule, 
    MatSidenavModule, 
    MatListModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css',
})
export class PatientDashboard {

  auth= inject(AuthService);
  user = this.auth.user;

  private firestore = inject(Firestore);

  // Firestore stream filtered for "doctor" role
  private docs$ = collectionData(
    query(collection(this.firestore, 'Users'), where('role', '==', 'doctor')), 
    { idField: 'id' }
  ) as Observable<any[]>;

  // Signal holding our doctor list

  doctors = toSignal(this.docs$, { initialValue: [] });

}


