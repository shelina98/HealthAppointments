import { Component, inject, Signal } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDividerModule} from '@angular/material/divider'
import { RouterLink, RouterLinkActive} from '@angular/router'
import { AuthService } from '../../auth/auth-service';
import { UserRole } from '../../models/users';

@Component({
  selector: 'app-navbar-component',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDividerModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {

   auth = inject(AuthService);

  isDoctor = this.auth.isDoctor;
  isPatient = this.auth.isPatient;
  isLoggedIn = this.auth.isLoggedIn;
}
  



