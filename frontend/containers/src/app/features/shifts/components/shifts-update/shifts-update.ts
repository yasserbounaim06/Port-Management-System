import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShiftsService } from '../../services/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shifts-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './shifts-update.html',
  styleUrls: ['./shifts-update.css'],
  providers: [ShiftsService]
})
export class ShiftsUpdate {
  shiftForm: FormGroup;
  shiftId!: number;
  shift: any;

  constructor(
    private formBuilder: FormBuilder,
    private shiftsService: ShiftsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.shiftForm = this.formBuilder.group({
      id: [''],
      nom: [''],
      horaire_debut: ['', Validators.required],
      horaire_fin: ['', Validators.required],
      created_at: [''],
      updated_at: [''], 
    });
  }

  ngOnInit(): void {
    this.shiftId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.shiftId) {
      this.shiftsService.getShiftById(this.shiftId).subscribe(
        (data: any) => {
          this.shiftForm.patchValue({
            id: data.id,
            nom: data.nom,
            horaire_debut: data.horaire_debut,
            horaire_fin: data.horaire_fin,
            created_at: data.created_at,
            updated_at: data.updated_at
          });
        },
        (error) => {
          console.error('Error fetching shift details:', error);
        }
      );
    }
  }

  updateShift(): void {
    if (this.shiftForm.valid) {
      this.shiftsService.updateShift(this.shiftId, this.shiftForm.value).subscribe({
        next: () => {
          this.router.navigate(['/shifts']);
        },
        error: (err) => {
          console.error('Error updating shift:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
