import { inject, Injectable } from '@angular/core';
import { User } from '../models/users';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    firestore = inject(Firestore)
    
    async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(this.firestore, "Users"));
    return querySnapshot.docs.map(doc => ({
      ...doc.data()
    })) as User[];
  }

  
}
