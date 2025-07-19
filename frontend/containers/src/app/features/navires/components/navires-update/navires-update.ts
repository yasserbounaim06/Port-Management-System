import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NaviresService } from '../../services/navires.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navires-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './navires-update.html',
  styleUrls: ['./navires-update.css'],
  providers: [NaviresService]
})
export class NaviresUpdate {
  navireForm: FormGroup;
  navireId!: number;
  navire: any;

  constructor(
    private formBuilder: FormBuilder,
    private naviresService: NaviresService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.navireForm = this.formBuilder.group({
      matricule_navire: [''],
      nom: ['', Validators.required],
      capacity: [null],
      created_at: [''],
      updated_at: [''], 
    });
  }

  ngOnInit(): void {
    this.navireId = Number(this.route.snapshot.paramMap.get('matricule'));
    if (this.navireId) {
      this.naviresService.getNavireById(this.navireId).subscribe(
        (data: any) => {
          this.navireForm.patchValue({
            matricule_navire: data.matricule_navire,
            nom: data.nom,
            capacity: data.capacity,
            created_at: data.created_at,
            updated_at: data.updated_at
          });
        },
        (error) => {
          console.error('Error fetching navire details:', error);
        }
      );
    }
  }

  updateNavire(): void {
    if (this.navireForm.valid) {
      this.naviresService.updateNavire(this.navireId, this.navireForm.value).subscribe({
        next: () => {
          this.router.navigate(['/navires']);
        },
        error: (err) => {
          console.error('Error updating navire:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
