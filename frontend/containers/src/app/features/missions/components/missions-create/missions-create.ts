import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MissionsService } from '../../services/missions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-missions-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './missions-create.html',
  styleUrl: './missions-create.css',
  providers: [MissionsService]
})
export class MissionsCreate {
  missionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private missionsService: MissionsService,
    private router: Router,
  ) {
    this.missionForm = this.formBuilder.group({
      id: [null],
      id_personnel: ['', Validators.required],
      id_operation: ['', Validators.required],
      role: [''],
      created_at: [null], 
    });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      this.missionsService.createMission(this.missionForm.value).subscribe({
        next: () => {
          this.router.navigate(['/missions']);
        },
        error: (err) => {
          console.error('Error creating mission:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
