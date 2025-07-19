import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MissionsService } from '../../services/missions.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-missions-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './missions-update.html',
  styleUrls: ['./missions-update.css'],
  providers: [MissionsService]
})
export class MissionsUpdate {
  missionForm: FormGroup;
  missionId!: number;
  mission: any;

  constructor(
    private formBuilder: FormBuilder,
    private missionsService: MissionsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.missionForm = this.formBuilder.group({
      id: [''],
      id_personnel: ['', Validators.required],
      id_operation: ['', Validators.required],
      role: [''],
      created_at: [''], 
    });
  }

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.missionId) {
      this.missionsService.getMissionById(this.missionId).subscribe(
        (data: any) => {
          this.missionForm.patchValue({
            id: data.id,
            id_personnel: data.id_personnel,
            id_operation: data.id_operation,
            role: data.role,
            created_at: data.created_at
          });
        },
        (error) => {
          console.error('Error fetching mission details:', error);
        }
      );
    }
  }

  updateMission(): void {
    if (this.missionForm.valid) {
      this.missionsService.updateMission(this.missionId, this.missionForm.value).subscribe({
        next: () => {
          this.router.navigate(['/missions']);
        },
        error: (err) => {
          console.error('Error updating mission:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
