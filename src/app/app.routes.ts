import { Routes } from '@angular/router';
import { PatientDashboard } from './patientComponents/patient-dashboard/patient-dashboard';
import { LoginComponent } from './components/login-component/login-component';
import { MedicalHistoryComponent } from './patientComponents/medical-history-component/medical-history-component';
import { DoctorDashboard } from './doctorComponents/doctor-dashboard/doctor-dashboard';
import { DocScheduleComponent } from './doctorComponents/doc-schedule-component/doc-schedule-component';

export const routes: Routes = [
    {path:'', component:PatientDashboard},

    { path: 'patient-dashboard', component: PatientDashboard },
  
    { path: 'doctor-dashboard', component: DoctorDashboard },

    { path:'doctor-schedule', component: DocScheduleComponent},

    { path: 'medical-history', component: MedicalHistoryComponent},

    { path: 'login', component:LoginComponent},

    { path: '**', redirectTo: '' }    
];
