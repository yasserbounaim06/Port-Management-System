import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnginsService } from '../../services/engins.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-engins-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './engins-update.html',
  styleUrls: ['./engins-update.css'],
  providers: [EnginsService]
})
export class EnginsUpdate {
  enginForm: FormGroup;
  enginId!: number;
  engin: any;

  constructor(
    private formBuilder: FormBuilder,
    private enginsService: EnginsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.enginForm = this.formBuilder.group({
      matricule_engin: [''],
      nom: ['', Validators.required],
      type_engin: [''],
      statut: [''],
      created_at: [''],
      updated_at: [''], 
    });
  }

  ngOnInit(): void {
    this.enginId = Number(this.route.snapshot.paramMap.get('matricule'));
    if (this.enginId) {
      this.enginsService.getEnginById(this.enginId).subscribe(
        (data: any) => {
          this.enginForm.patchValue({
            matricule_engin: data.matricule_engin,
            nom: data.nom,
            type_engin: data.type_engin,
            statut: data.statut,
            created_at: data.created_at,
            updated_at: data.updated_at
          });
        },
        (error) => {
          console.error('Error fetching engin details:', error);
        }
      );
    }
  }

  updateEngin(): void {
    if (this.enginForm.valid) {
      this.enginsService.updateEngin(this.enginId, this.enginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/engins']);
        },
        error: (err) => {
          console.error('Error updating engin:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
