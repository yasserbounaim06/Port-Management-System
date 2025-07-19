import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ShiftsService } from '../../services/shifts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shifts-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './shifts-create.html',
  styleUrl: './shifts-create.css',
  providers: [ShiftsService]
})
export class ShiftsCreate {
  shiftForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private shiftsService: ShiftsService,
    private router: Router,
  ) {
    this.shiftForm = this.formBuilder.group({
      id: [null],
      nom: [''],
      horaire_debut: ['', Validators.required],
      horaire_fin: ['', Validators.required],
      created_at: [null],
      updated_at: [null], 
    });
  }

  onSubmit(): void {
    if (this.shiftForm.valid) {
      this.shiftsService.createShift(this.shiftForm.value).subscribe({
        next: () => {
          this.router.navigate(['/shifts']);
        },
        error: (err) => {
          console.error('Error creating shift:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
