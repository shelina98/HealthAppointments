import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (authService.isDoctor()) {
    return true;
  } else {
    snackBar.open('Access Denied: You do not have permission for this page.', 'OK', {
      duration: 2000,
      panelClass: ['red-snackbar', 'login-snackbar'],
    });
    return router.createUrlTree(['/']);
  }
  return true;
};
