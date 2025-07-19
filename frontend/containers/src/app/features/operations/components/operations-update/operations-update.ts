import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OperationsService } from '../../services/operations.service';
import { ContainerService } from '../../../containers/services/container.service';
import { EnginsService } from '../../../engins/services/engins.service';
import { NaviresService } from '../../../navires/services/navires.service';
import { ShiftsService } from '../../../shifts/services/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from '../../../personnel/services/personnel.service';
import { Personnel } from '../../../personnel/models/personnel.model';

@Component({
  selector: 'app-operations-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './operations-update.html',
  styleUrls: ['./operations-update.css'],
  providers: [OperationsService, ContainerService, EnginsService, NaviresService, ShiftsService]
})
export class OperationsUpdate implements OnInit {
  operationForm: FormGroup;
  operationId!: number;
  operation: any;
  containers: any[] = [];
  engins: any[] = [];
  navires: any[] = [];
  shifts: any[] = [];
  personnels: Personnel[] = [];
  ShiftsService: any;

  constructor(
    private formBuilder: FormBuilder,
    private operationsService: OperationsService,
    private containerService: ContainerService,
    private enginsService: EnginsService,
    private naviresService: NaviresService,
    private shiftsService: ShiftsService,
    private personnelService: PersonnelService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.operationForm = this.formBuilder.group({
      id: [''],
      nom: ['', Validators.required],
      type_operation: [''],
      statut: [''],
      date_debut: [null],
      date_fin: [null],
      id_navire: [null],
      containers: [[]],
      engins: [[]],
      shifts: [[]],
      personnels: [[]],
      created_at: [''],
      updated_at: [''], 
    });
  }

  ngOnInit(): void {
    this.operationId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContainers();
    this.loadEngins();
    this.loadNavires();
    this.loadShifts();
    this.loadPersonnels();
    
    if (this.operationId) {
      this.loadOperation();
    }
  }

  loadOperation(): void {
    this.operationsService.getOperationById(this.operationId).subscribe(
      (data: any) => {
        // Format dates for datetime-local input
        const formattedData = { ...data };
        if (data.date_debut) {
          formattedData.date_debut = this.formatDateForInput(data.date_debut);
        }
        if (data.date_fin) {
          formattedData.date_fin = this.formatDateForInput(data.date_fin);
        }
        // Patch personnels field
        if (data.personnels) {
          formattedData.personnels = data.personnels;
        }
        this.operationForm.patchValue(formattedData);
      },
      (error) => {
        console.error('Error fetching operation details:', error);
      }
    );
  }

  loadContainers(): void {
    this.containerService.getContainers().subscribe({
      next: (data) => {
        this.containers = data;
      },
      error: (err) => {
        console.error('Error loading containers:', err);
      }
    });
  }

  loadEngins(): void {
    this.enginsService.getEngins().subscribe({
      next: (data) => {
        this.engins = data;
      },
      error: (err) => {
        console.error('Error loading engins:', err);
      }
    });
  }

  loadNavires(): void {
    this.naviresService.getNavires().subscribe({
      next: (data) => {
        this.navires = data;
      },
      error: (err) => {
        console.error('Error loading navires:', err);
      }
    });
  }

  loadShifts(): void {
    this.shiftsService.getShifts().subscribe({
      next: (data: any[]) => {
        this.shifts = data;
      },
      error: (err: any) => {
        console.error('Error loading shifts:', err);
      }
    });
  }

  getShiftName(shiftId: number): string {
    const shift = this.shifts.find(s => s.id === shiftId);
    return shift ? shift.nom : `ID: ${shiftId}`;
  }

  loadPersonnels(): void {
    this.personnelService.getPersonnel().subscribe({
      next: (data) => {
        this.personnels = data;
      },
      error: (err) => {
        console.error('Error loading personnels:', err);
      }
    });
  }

  updateOperation(): void {
    if (this.operationForm.valid) {
      const formData = { ...this.operationForm.value };
      
      // Convert date strings to proper format if they exist
      if (formData.date_debut) {
        formData.date_debut = new Date(formData.date_debut).toISOString();
      }
      if (formData.date_fin) {
        formData.date_fin = new Date(formData.date_fin).toISOString();
      }

      this.operationsService.updateOperation(this.operationId, formData).subscribe({
        next: () => {
          this.router.navigate(['/operations']);
        },
        error: (err) => {
          console.error('Error updating operation:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Helper method to format date for datetime-local input
  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      // Format as YYYY-MM-DDTHH:MM for datetime-local input
      return date.toISOString().slice(0, 16);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }
}