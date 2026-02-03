import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, updateDoc, query, where, } from '@angular/fire/firestore';
import { User } from './models/users';
import { Appointments } from './models/appointments';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  
  private firestore = inject(Firestore);

  async createAppointmentRequest(patient: User, doctor: User, appointmentBody: any) {
    const NewApptDoc = doc(collection(this.firestore, 'Appointments'));
    const formattedDate = appointmentBody.date instanceof Date ? appointmentBody.date.toISOString().split('T')[0] : appointmentBody.date;
    await setDoc(NewApptDoc, {
      id: NewApptDoc.id,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      docName: doctor.name,
      symptoms: appointmentBody.symptoms,
      date: formattedDate,
      time: appointmentBody.time,
      status: 'requested', // Hardcoded as requested
    }).then(()=> {
      console.log('finish')
    });
  }

  
  async getAppointments(): Promise<Appointments[]> {
    const querySnapshot = await getDocs(collection(this.firestore, "Appointments"));
    return querySnapshot.docs.map(doc => ({
      ...doc.data()
    })) as Appointments[];
  }

  async deleteAppointment(apptId: string) {
  const docRef = doc(this.firestore, 'Appointments', apptId);
  return deleteDoc(docRef);
}

 async confirmAppointment(apptId: string) {
  const docRef = doc(this.firestore, 'Appointments', apptId);
  await  updateDoc(docRef, {
  status: 'scheduled'
  });
}

async startAppointment(apptId:string){
   const docRef = doc(this.firestore, 'Appointments', apptId);
  await  updateDoc(docRef, {
  status: 'ongoing'
  });

}

async endAppointment(apptId:string) {
   const docRef = doc(this.firestore, 'Appointments', apptId);
  await  updateDoc(docRef, {
  status: 'done'
  });
}

async getBusySlots(doctorId: string, date: string): Promise<string[]> {
    const apptRef = collection(this.firestore, 'Appointments');
    const q = query(
      apptRef,
      where('doctorId', '==', doctorId),
      where('date', '==', date ),
      where('status', 'in', ['requested', 'scheduled','ongoing'])
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data()['time']);
  }
}
