import { Routes } from '@angular/router';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';
import { PatientDashboard } from './components/patient-dashboard/patient-dashboard';

export const routes: Routes = [
    {path:'', component:PatientDashboard},

    { path: 'patient-dashboard', component: PatientDashboard },
  
    { path: 'doctor-dashboard', component: DoctorDashboard },

    { path: '**', redirectTo: '' }    
];
