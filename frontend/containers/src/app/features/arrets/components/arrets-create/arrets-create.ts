import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ArretsService } from '../../services/arrets.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-arrets-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './arrets-create.html',
  styleUrl: './arrets-create.css',
  providers: [ArretsService]
})
export class ArretsCreate {
  arretForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private arretsService: ArretsService,
    private router: Router,
  ) {
    this.arretForm = this.formBuilder.group({
      id: [null],
      description: ['', Validators.required],
      duree: [null],
      type_arret: [''],
      created_at: [null],
      updated_at: [null], 
    });
  }

  onSubmit(): void {
    if (this.arretForm.valid) {
      this.arretsService.createArret(this.arretForm.value).subscribe({
        next: () => {
          this.router.navigate(['/arrets']);
        },
        error: (err) => {
          console.error('Error creating arret:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
