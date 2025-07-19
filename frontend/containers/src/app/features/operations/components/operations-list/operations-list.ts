import { Component, OnInit } from '@angular/core';
import { Operation } from '../../models/operations.model';
import { OperationsService } from '../../services/operations.service';
import { ContainerService } from '../../../containers/services/container.service';
import { EnginsService } from '../../../engins/services/engins.service';
import { NaviresService } from '../../../navires/services/navires.service';
import { ShiftsService } from '../../../shifts/services/shifts.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PersonnelService } from '../../../personnel/services/personnel.service';
import { Personnel } from '../../../personnel/models/personnel.model';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [OperationsService, ContainerService, EnginsService, NaviresService], 
  styleUrls: ['./operations-list.css'] 
})
export class OperationsList implements OnInit {

  operations: Operation[] = [];
  containers: any[] = [];
  engins: any[] = [];
  navires: any[] = [];
  shifts: any[] = [];
  personnels: Personnel[] = [];

  constructor(
    private operationsService: OperationsService,
    private containerService: ContainerService,
    private enginsService: EnginsService,
    private naviresService: NaviresService,
    private shiftsService: ShiftsService,
    private personnelService: PersonnelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOperations();
    this.loadContainers();
    this.loadEngins();
    this.loadNavires();
    this.loadShifts();
    this.loadPersonnels();

    // Debug: log loaded data after a short delay to ensure async loads have completed
    setTimeout(() => {
      console.log('Loaded operations:', this.operations);
      console.log('Loaded containers:', this.containers);
      console.log('Loaded engins:', this.engins);
      console.log('Loaded navires:', this.navires);
      console.log('Loaded personnels:', this.personnels);
    }, 2000);
  }

  getOperations(): void {
    this.operationsService.getOperations().subscribe((data: Operation[]) => {
      this.operations = data;
    });
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

  deleteOperation(id: any) {
    if (confirm('Are you sure you want to delete this operation?')) {
      this.operationsService.deleteOperation(id).subscribe(() => {
        this.getOperations();
      });
    }
  }
  
  editOperation(id: any) {
    this.router.navigate(['/operations/edit-operation', id]);
  }

  loadShifts(): void {
    this.shiftsService.getShifts().subscribe({
      next: (data) => {
        this.shifts = data;
      },
      error: (err) => {
        console.error('Error loading shifts:', err);
      }
    });
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

  // Helper for personnel names
  getPersonnelName(personnelId: number): string {
    const personnel = this.personnels.find(p => p.id === personnelId);
    return personnel ? `${personnel.nom} ${personnel.prenom}` : `ID: ${personnelId}`;
  }

  // Helper methods to get names from IDs
  getContainerNumber(containerId: number): string {
    const container = this.containers.find(c => c.id === containerId);
    return container ? container.container_number : `ID: ${containerId}`;
  }

  getEnginName(enginId: number): string {
    const engin = this.engins.find(e => e.matricule_engin === enginId);
    return engin ? engin.nom : `ID: ${enginId}`;
  }

  getNavireName(navireId: number): string {
    const navire = this.navires.find(n => n.matricule_navire === navireId);
    return navire ? navire.nom : String(navireId);
  }

  getShiftName(shiftId: number): string {
    const shift = this.shifts.find(s => s.id === shiftId);
    return shift ? shift.nom : `ID: ${shiftId}`;
  }

  // Format date for display
  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  }
}