import { Routes } from '@angular/router';
import { DoctorDashboard } from './components/doctor-dashboard/doctor-dashboard';
import { PatientDashboard } from './components/patient-dashboard/patient-dashboard';
import { LoginComponent } from './components/login-component/login-component';
import { DocScheduleComponent } from './doc-schedule-component/doc-schedule-component';
import { MedicalHistoryComponent } from './medical-history-component/medical-history-component';

export const routes: Routes = [
    {path:'', component:PatientDashboard},

    { path: 'patient-dashboard', component: PatientDashboard },
  
    { path: 'doctor-dashboard', component: DoctorDashboard },

    { path:'doctor-schedule', component: DocScheduleComponent},

    { path: 'medical-history', component: MedicalHistoryComponent},

    { path: 'login', component:LoginComponent},

    { path: '**', redirectTo: '' }    
];
