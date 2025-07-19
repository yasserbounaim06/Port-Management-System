import { Component, OnInit } from '@angular/core';
import { Shift } from '../../models/shifts.model';
import { ShiftsService } from '../../services/shifts.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [ShiftsService], 
  styleUrls: ['./shifts-list.css'] 
})
export class ShiftsList implements OnInit {

  shifts: Shift[] = [];

  constructor(private shiftsService: ShiftsService, private router: Router) { }

  ngOnInit(): void {
    this.getShifts();
  }

  getShifts(): void {
    this.shiftsService.getShifts().subscribe((data: Shift[]) => {
      this.shifts = data;
    });
  }

  deleteShift(id: any) {
    this.shiftsService.deleteShift(id).subscribe(() => {
      this.getShifts();
    });
  }
  
  editShift(id: any) {
    this.router.navigate(['/shifts/edit-shift', id]);
  }
}
