import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OccupationsService } from '../../services/occupations.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-occupations-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './occupations-update.html',
  styleUrls: ['./occupations-update.css'],
  providers: [OccupationsService]
})
export class OccupationsUpdate {
  occupationForm: FormGroup;
  occupationId!: number;
  occupation: any;

  constructor(
    private formBuilder: FormBuilder,
    private occupationsService: OccupationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.occupationForm = this.formBuilder.group({
      id: [''],
      matricule_engin: ['', Validators.required],
      id_operation: ['', Validators.required],
      heure_debut: [null],
      heure_fin: [null],
      created_at: [''], 
    });
  }

  ngOnInit(): void {
    this.occupationId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.occupationId) {
      this.occupationsService.getOccupationById(this.occupationId).subscribe(
        (data: any) => {
          this.occupationForm.patchValue({
            id: data.id,
            matricule_engin: data.matricule_engin,
            id_operation: data.id_operation,
            heure_debut: data.heure_debut,
            heure_fin: data.heure_fin,
            created_at: data.created_at
          });
        },
        (error) => {
          console.error('Error fetching occupation details:', error);
        }
      );
    }
  }

  updateOccupation(): void {
    if (this.occupationForm.valid) {
      this.occupationsService.updateOccupation(this.occupationId, this.occupationForm.value).subscribe({
        next: () => {
          this.router.navigate(['/occupations']);
        },
        error: (err) => {
          console.error('Error updating occupation:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
