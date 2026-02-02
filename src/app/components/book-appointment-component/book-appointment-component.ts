import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../appointment-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-book-appointment-component',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
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
    symptoms: ['', [Validators.required, Validators.minLength(5)]]
  });


  async submitRequest() {
    if (this.bookingForm.valid) {
      const { symptoms } = this.bookingForm.value;
      
      try {
        await this.apptService.createAppointmentRequest(
          this.data.patient, 
          this.data.doctor, 
          symptoms
        );
        this.dialogRef.close(true);
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    }
  }

}
