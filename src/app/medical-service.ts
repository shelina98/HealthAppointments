import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MedicalService {

    firestore = inject(Firestore)

    async createMedicalHistory(MedicalHistoryBody: any) {
    const NewApptDoc = doc(collection(this.firestore, 'MedicalHistory'));
    await setDoc(NewApptDoc, {
      id: NewApptDoc.id,
      symptoms: MedicalHistoryBody.symptoms,
      diagnosis: MedicalHistoryBody.diagnosis,
      prescription: MedicalHistoryBody.prescription

    }).then(()=> {
      console.log('finish')
    });
  }

  
}
