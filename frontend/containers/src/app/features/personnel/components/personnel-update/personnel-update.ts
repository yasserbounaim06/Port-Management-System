import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonnelService } from '../../services/personnel.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personnel-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './personnel-update.html',
  styleUrls: ['./personnel-update.css'],
  providers: [PersonnelService]
})
export class PersonnelUpdate {
  personnelForm: FormGroup;
  personnelId!: number;
  personnel: any;

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.personnelForm = this.formBuilder.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      id_shift: [null],
      created_at: [''],
      updated_at: [''], 
    });
  }

  ngOnInit(): void {
    this.personnelId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.personnelId) {
      this.personnelService.getPersonnelById(this.personnelId).subscribe(
        (data: any) => {
          this.personnelForm.patchValue({
            id: data.id,
            nom: data.nom,
            prenom: data.prenom,
            poste: data.poste,
            id_shift: data.id_shift,
            created_at: data.created_at,
            updated_at: data.updated_at
          });
        },
        (error) => {
          console.error('Error fetching personnel details:', error);
        }
      );
    }
  }

  updatePersonnel(): void {
    if (this.personnelForm.valid) {
      this.personnelService.updatePersonnel(this.personnelId, this.personnelForm.value).subscribe({
        next: () => {
          this.router.navigate(['/personnel']);
        },
        error: (err) => {
          console.error('Error updating personnel:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
