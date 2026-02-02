import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../appointment-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule} from '@angular/material/core'; 
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-book-appointment-component',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,    
    MatOptionModule,   
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './book-appointment-component.html',
  styleUrl: './book-appointment-component.css',
})
export class BookAppointmentComponent {

  private fb = inject(FormBuilder);
  private apptService = inject(AppointmentService);

  public dialogRef = inject(MatDialogRef<BookAppointmentComponent>);
  
  // Data passed from your button: { patient: any, doctor: any }
  data = inject(MAT_DIALOG_DATA);

  bookingForm: FormGroup = this.fb.group({
    symptoms: ['', [Validators.required, Validators.minLength(5)]],
    date: [new Date(), Validators.required],
    time: ['', Validators.required]
  });


  timeSlots: string[] = [
    '08:00', '08:30', '09:00', '09:30', 
    '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ];

  async submitRequest() {
    if (this.bookingForm.valid) {
      const { symptoms, date, time } = this.bookingForm.value;
      
      try {
        await this.apptService.createAppointmentRequest(
          this.data.patient, 
          this.data.doctor, 
          {symptoms, date, time}
        );
        this.dialogRef.close(true);
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    }
  }

}
