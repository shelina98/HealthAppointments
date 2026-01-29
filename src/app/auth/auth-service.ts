import { inject, Injectable , signal, computed,} from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { query, where, limit, getDocs  } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private router = inject(Router);
  private firestore = inject(Firestore)

  private currentUser = signal<User | null>(null);

  user = computed(() => this.currentUser());
  isLoggedIn = computed(() => !!this.currentUser());

  isDoctor = computed(() => this.currentUser()?.role === 'doctor');
  isPatient = computed(() => this.currentUser()?.role === 'patient');


  setUser(userData: User) {
    this.currentUser.set(userData);
  }

  logout() {
    this.currentUser.set(null);
    this.router.navigate(['/']);
    }


  async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(this.firestore, "Users"));
    return querySnapshot.docs.map(doc => ({
      ...doc.data()
    })) as User[];
  }


  async login(credentials: Partial<{
    email: string | null;
    password: string | null;
}>) {
    try {
      const allUsers = await this.getUsers();
      const foundUser = allUsers.find(u => u.email === credentials.email);

      if (!foundUser) {
       console.log('User does not exists./ your email maight be wrong')
        return;
      }

      if (foundUser.password !== credentials.password) {
        console.log('wrong password')
        return;
      }

      this.setUser(foundUser);
      console.log("Login successful!", foundUser);
      
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
