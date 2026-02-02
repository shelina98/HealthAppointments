import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, } from '@angular/fire/firestore';
import { User } from './models/users';
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  
  private firestore = inject(Firestore);

  async createAppointmentRequest(patient: User, doctor: User, appointmentBody: any) {
    const apptCollection = collection(this.firestore, 'Appointments');
    const formattedDate = appointmentBody.date instanceof Date ? appointmentBody.date.toISOString().split('T')[0] : appointmentBody.date;
    await addDoc(apptCollection, {
      id: apptCollection.id,
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
}
