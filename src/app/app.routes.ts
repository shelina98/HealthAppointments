import { Routes } from '@angular/router';
import { PatientDashboard } from './patientComponents/patient-dashboard/patient-dashboard';
import { LoginComponent } from './components/login-component/login-component';
import { MedicalHistoryComponent } from './patientComponents/medical-history-component/medical-history-component';
import { DoctorDashboard } from './doctorComponents/doctor-dashboard/doctor-dashboard';
import { DocScheduleComponent } from './doctorComponents/doc-schedule-component/doc-schedule-component';
import { authGuard } from './guards/auth-guard';
import { roleGuardGuard } from './guards/role-guard-guard';
import { patientguardGuard } from './guards/patientguard-guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth-service';

export const routes: Routes = [
  {
    path: '',
    component: PatientDashboard,
    canActivate: [patientguardGuard],
  },

  { path: 'patient-dashboard', component: PatientDashboard, canActivate: [] },

  {
    path: 'doctor-dashboard',
    component: DoctorDashboard,
    canActivate: [authGuard, roleGuardGuard],
  },

  {
    path: 'doctor-schedule',
    component: DocScheduleComponent,
    canActivate: [authGuard, roleGuardGuard],
  },

  {
    path: 'medical-history',
    component: MedicalHistoryComponent,
    canActivate: [authGuard, patientguardGuard],
  },

  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '' },
];
