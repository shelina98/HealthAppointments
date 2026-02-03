import { inject, Injectable , signal, computed,} from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { query, where, limit, getDocs  } from '@angular/fire/firestore';
import { UserService } from './user-service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private router = inject(Router);
  private userService = inject(UserService);

  private currentUser = signal<User | null>(null);
  user = computed(() => this.currentUser());


  isLoggedIn = computed(() => !!this.currentUser());
  correctCredentials : boolean = true;


  isDoctor = computed(() => this.currentUser()?.role === 'doctor');
  isPatient = computed(() => this.currentUser()?.role === 'patient');


  setUser(userData: User) {
    this.currentUser.set(userData);
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  async login(credentials: Partial<{
    email: string | null;
    password: string | null;
}>) {
    try {
      const allUsers = await this.userService.getUsers();
      const foundUser = allUsers.find(u => u.email === credentials.email);

      if (!foundUser) {
      console.log('User does not exists./ your email maight be wrong')
      this.correctCredentials = false
      return;
      }

      if (foundUser.password !== credentials.password) {
              this.correctCredentials = false

        console.log('wrong password')
        return;
      }

      //succesful login
      this.correctCredentials = true
      this.setUser(foundUser);
      console.log("Login successful!", foundUser);
      
      //navigation
      if (foundUser.role === 'doctor') {
        this.router.navigate(['/doctor-dashboard']);
      } else {
        this.router.navigate(['/patient-dashboard']);
      }

    } 
    catch (error) {
      console.error("Login error:", error);
    }
  }
}
