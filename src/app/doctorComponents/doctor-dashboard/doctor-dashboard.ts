import { Component } from '@angular/core';
import { AppointmentListComponent } from '../appointment-list-component/appointment-list-component';


@Component({
  selector: 'app-doctor-dashboard',
  imports: [
    AppointmentListComponent
  ],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css',
})
export class DoctorDashboard {


}
