import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NaviresService } from '../../services/navires.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

@Component({
  selector: 'app-navires-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './navires-create.html',
  styleUrl: './navires-create.css',
  providers: [NaviresService]
})
export class NaviresCreate {
  navireForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private naviresService: NaviresService,
    private router: Router,
  ) {
    this.navireForm = this.formBuilder.group({
      matricule_navire: [null, Validators.required],
      nom: ['', Validators.required],
      capacity: [null],
      created_at: ['', dateTimestampProvider.now],
      updated_at: ['', dateTimestampProvider.now], 
    });
  }

  onSubmit(): void {
    if (this.navireForm.valid) {
      this.naviresService.createNavire(this.navireForm.value).subscribe({
        next: () => {
          this.router.navigate(['/navires']);
        },
        error: (err) => {
          console.error('Error creating navire:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
