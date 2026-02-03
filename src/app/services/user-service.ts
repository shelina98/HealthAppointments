import { inject, Injectable } from '@angular/core';
import { User } from '../models/users';
import { collection, collectionData, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

    firestore = inject(Firestore)
    
    //get ALLUsers
    async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(this.firestore, "Users"));
    return querySnapshot.docs.map(doc => ({
      ...doc.data()
    })) as User[];
  }

  //getDoctors 

   getDoctors(): Observable<User[]> {

   const doctorsRef = collection(this.firestore, 'Users');
   const q = query(doctorsRef, where('role', '==', 'doctor'));
   return collectionData(q, { idField: 'id' }) as Observable<User[]>;

   
  }

}
