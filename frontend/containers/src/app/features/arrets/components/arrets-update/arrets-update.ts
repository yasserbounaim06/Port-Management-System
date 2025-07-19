import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArretsService } from '../../services/arrets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-arrets-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './arrets-update.html',
  styleUrls: ['./arrets-update.css'],
  providers: [ArretsService]
})
export class ArretsUpdate {
  arretForm: FormGroup;
  arretId!: number;
  arret: any;

  constructor(
    private formBuilder: FormBuilder,
    private arretsService: ArretsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.arretForm = this.formBuilder.group({
      id: [''],
      description: ['', Validators.required],
      duree: [null],
      type_arret: [''],
      created_at: [''],
      updated_at: [''], 
    });
  }

  ngOnInit(): void {
    this.arretId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.arretId) {
      this.arretsService.getArretById(this.arretId).subscribe(
        (data: any) => {
          this.arretForm.patchValue({
            id: data.id,
            description: data.description,
            duree: data.duree,
            type_arret: data.type_arret,
            created_at: data.created_at,
            updated_at: data.updated_at
          });
        },
        (error) => {
          console.error('Error fetching arret details:', error);
        }
      );
    }
  }

  updateArret(): void {
    if (this.arretForm.valid) {
      this.arretsService.updateArret(this.arretId, this.arretForm.value).subscribe({
        next: () => {
          this.router.navigate(['/arrets']);
        },
        error: (err) => {
          console.error('Error updating arret:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
