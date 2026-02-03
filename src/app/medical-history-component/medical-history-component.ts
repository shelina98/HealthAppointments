import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { MedicalService } from '../medical-service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-medical-history-component',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './medical-history-component.html',
  styleUrl: './medical-history-component.css',
})
export class MedicalHistoryComponent {


  authService= inject(AuthService)
  medicalService= inject(MedicalService)

  historyRecords = signal<any[]>([]);
  currentIndex = signal(0);

  currentRecord = computed(() => {
    const list = this.historyRecords();
    return list.length > 0 ? list[this.currentIndex()] : null;
  });
  

  async ngOnInit() {
    const user = this.authService.user();
    if (user) {
      const data = await this.medicalService.getPatientHistory(user.id);
      this.historyRecords.set(data)
    }
  }

  next() {
    if (this.currentIndex() < this.historyRecords().length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

}
