import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MedicalService {

    firestore = inject(Firestore)

    async createMedicalHistory(docName:string, docId: string, patName:string, patId: string, MedicalHistoryBody: any) {
    const NewApptDoc = doc(collection(this.firestore, 'MedicalHistory'));
    await setDoc(NewApptDoc, {
      id: NewApptDoc.id,
      docName:docName,
      docId: docId,
      patName:patName,
      patId:patId,
      symptoms: MedicalHistoryBody.symptoms,
      diagnosis: MedicalHistoryBody.diagnosis,
      prescription: MedicalHistoryBody.prescription,
      date: new Date()

    }).then(()=> {
      console.log('finish')
    });
  }

  
}
