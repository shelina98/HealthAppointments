import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const patientguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.currentUser();
  const snackBar = inject(MatSnackBar);

  // If no one is logged in, let them see the public doctor list
  if (!user) return true;

  // If a DOCTOR tries to enter, redirect them to their own home
  if (user.role === 'doctor') {
    snackBar.open('Access Denied: You do not have permission for this page.', 'OK', {
      duration: 2000,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
    return router.createUrlTree(['/doctor-dashboard']);
  }

  // Otherwise, they are a patient, let them in
  return true;
};
