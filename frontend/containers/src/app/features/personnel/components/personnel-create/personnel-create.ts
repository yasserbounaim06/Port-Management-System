import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-personnel-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './personnel-create.html',
  styleUrl: './personnel-create.css',
  providers: [PersonnelService]
})
export class PersonnelCreate {
  personnelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelService,
    private router: Router,
  ) {
    this.personnelForm = this.formBuilder.group({
      id: [null],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      poste: ['', Validators.required],
      id_shift: [null],
      created_at: [null],
      updated_at: [null], 
    });
  }

  onSubmit(): void {
    if (this.personnelForm.valid) {
      this.personnelService.createPersonnel(this.personnelForm.value).subscribe({
        next: () => {
          this.router.navigate(['/personnel']);
        },
        error: (err) => {
          console.error('Error creating personnel:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
