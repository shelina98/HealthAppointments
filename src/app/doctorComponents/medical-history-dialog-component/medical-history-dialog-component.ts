import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MedicalService } from '../../services/medical-service';

@Component({
  selector: 'app-medical-history-dialog-component',
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogActions ],
  templateUrl: './medical-history-dialog-component.html',
  styleUrl: './medical-history-dialog-component.css',
})
export class MedicalHistoryDialogComponent {

  public dialogRef = inject(MatDialogRef<MedicalHistoryDialogComponent>);

  data = inject(MAT_DIALOG_DATA)

  private apptService = inject(AppointmentService);
  private medicalService = inject(MedicalService)

  fb = inject(FormBuilder)

  medicalForm: FormGroup = this.fb.group({
  symptoms: [this.data.symptoms],
  diagnosis: ['', Validators.required],
  prescription: ['', Validators.required]
  });

  
 async save(medicalForm:any) {
   this.apptService.endAppointment(this.data.appoitmentID).then(async () => {
  await this.medicalService.createMedicalHistory(this.data.docName,
     this.data.docId, 
     this.data.patientName,
     this.data.patientId,
    medicalForm);
  this.dialogRef.close(true);
})

 }
 
}
