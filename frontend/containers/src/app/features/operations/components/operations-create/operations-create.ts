import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OperationsService } from '../../services/operations.service';
import { ContainerService } from '../../../containers/services/container.service';
import { EnginsService } from '../../../engins/services/engins.service';
import { NaviresService } from '../../../navires/services/navires.service';
import { ShiftsService } from '../../../shifts/services/shifts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonnelService } from '../../../personnel/services/personnel.service';
import { Personnel } from '../../../personnel/models/personnel.model';

@Component({
  selector: 'app-operations-create',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './operations-create.html',
  styleUrl: './operations-create.css',
  providers: [OperationsService, ContainerService, EnginsService, NaviresService]
})
export class OperationsCreate implements OnInit {
  operationForm: FormGroup;
  containers: any[] = [];
  engins: any[] = [];
  navires: any[] = [];
  shifts: any[] = [];
  personnels: Personnel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private operationsService: OperationsService,
    private containerService: ContainerService,
    private enginsService: EnginsService,
    private naviresService: NaviresService,
    private shiftsService: ShiftsService,
    private personnelService: PersonnelService,
    private router: Router,
  ) {
    this.operationForm = this.formBuilder.group({
      id: [null],
      nom: ['', Validators.required],
      type_operation: [''],
      statut: ['planifiee'],
      date_debut: [null],
      date_fin: [null],
      id_navire: [null],
      containers: [[]],
      engins: [[]],
      shifts: [[]],
      personnels: [[]],
      created_at: [null],
      updated_at: [null], 
    });
  }

  ngOnInit(): void {
    this.loadContainers();
    this.loadEngins();
    this.loadNavires();
    this.loadShifts();
    this.loadPersonnels();
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
        this.engins = data.filter(engin => engin.statut === 'disponible');
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

  onSubmit(): void {
    if (this.operationForm.valid) {
      const formData = { ...this.operationForm.value };
      
      // Convert date strings to proper format if they exist
      if (formData.date_debut) {
        formData.date_debut = new Date(formData.date_debut).toISOString();
      }
      if (formData.date_fin) {
        formData.date_fin = new Date(formData.date_fin).toISOString();
      }

      this.operationsService.createOperation(formData).subscribe({
        next: () => {
          this.router.navigate(['/operations']);
        },
        error: (err) => {
          console.error('Error creating operation:', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}