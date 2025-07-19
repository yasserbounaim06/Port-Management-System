import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OccupationsService } from '../../services/occupations.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-occupations-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './occupations-create.html',
  styleUrl: './occupations-create.css',
  providers: [OccupationsService]
})
export class OccupationsCreate {
  occupationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private occupationsService: OccupationsService,
    private router: Router,
  ) {
    this.occupationForm = this.formBuilder.group({
      id: [null],
      matricule_engin: ['', Validators.required],
      id_operation: ['', Validators.required],
      heure_debut: [null],
      heure_fin: [null],
      created_at: [null], 
    });
  }

  onSubmit(): void {
    if (this.occupationForm.valid) {
      this.occupationsService.createOccupation(this.occupationForm.value).subscribe({
        next: () => {
          this.router.navigate(['/occupations']);
        },
        error: (err) => {
          console.error('Error creating occupation:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
