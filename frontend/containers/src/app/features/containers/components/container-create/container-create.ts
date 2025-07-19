import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ContainerService } from '../../services/container.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-container-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './container-create.html',
  styleUrl: './container-create.css',
  providers: [ContainerService]
})
export class ContainerCreate {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private containerService: ContainerService,
    private router: Router,
  ) {
    this.userForm = this.formBuilder.group({
    id: [null],
    container_number: ['', Validators.required],
    iso_code: ['', Validators.required],
    other_info: [null],
    created_at: ['', dateTimestampProvider.now],
    updated_at: ['', dateTimestampProvider.now], 
  });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
    this.userForm.patchValue({container_number: file,})
    this.userForm.get('container_number')?.updateValueAndValidity();
    }
}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.containerService.createContainers(this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/containers']);
        },
        error: (err) => {
          console.error('Error creating container:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

}