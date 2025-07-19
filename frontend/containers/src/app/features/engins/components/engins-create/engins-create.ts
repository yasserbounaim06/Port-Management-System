import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnginsService } from '../../services/engins.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-engins-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './engins-create.html',
  styleUrl: './engins-create.css',
  providers: [EnginsService]
})
export class EnginsCreate {
  enginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private enginsService: EnginsService,
    private router: Router,
  ) {
    this.enginForm = this.formBuilder.group({
      matricule_engin: ['', Validators.required],
      nom: ['', Validators.required],
      type_engin: ['', Validators.required],
      statut: ['disponible', Validators.required],
      created_at: [null],
      updated_at: [null], 
    });
  }

  onSubmit(): void {
    if (this.enginForm.valid) {
      this.enginsService.createEngin(this.enginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/engins']);
        },
        error: (err) => {
          console.error('Error creating engin:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
