import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContainerService } from '../../services/container.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-container-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './container-update.html',
  styleUrls: ['./container-update.css'],
  providers: [ContainerService]
})
export class ContainerUpdate {
  userForm: FormGroup;
  userId!: number;
container: any;

  constructor(
    private formBuilder: FormBuilder,
    private containerService: ContainerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      container_number: ['', Validators.required],
      iso_code: ['', Validators.required],
      other_info: [null],
      created_at: ['', dateTimestampProvider.now],
      updated_at: ['', dateTimestampProvider.now], 
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.containerService.getContainerById(String(this.userId)).subscribe(
        (data: any) => {
          this.userForm.patchValue({
            id: data.id,
            container_number: data.container_number,
            iso_code: data.iso_code,
            other_info: data.other_info,
            created_at: data.created_at,
            updated_at: data.updated_at
          });
        },
        (error) => {
          console.error('Error fetching container details:', error);
        }
      );
    }
  }

  updateContainer(): void {
    if (this.userForm.valid) {
      this.containerService.updateContainers(String(this.userId), this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/containers']);
        },
        error: (err) => {
          console.error('Error updating container:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  editContainer(id: any) {
    this.router.navigate(['/containers/edit', id]);
  }
}
