import { Component, OnInit } from '@angular/core';
import { Occupation } from '../../models/occupations.model';
import { OccupationsService } from '../../services/occupations.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-occupations-list',
  templateUrl: './occupations-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [OccupationsService], 
  styleUrls: ['./occupations-list.css'] 
})
export class OccupationsList implements OnInit {

  occupations: Occupation[] = [];

  constructor(private occupationsService: OccupationsService, private router: Router) { }

  ngOnInit(): void {
    this.getOccupations();
  }

  getOccupations(): void {
    this.occupationsService.getOccupations().subscribe((data: Occupation[]) => {
      this.occupations = data;
    });
  }

  deleteOccupation(id: any) {
    this.occupationsService.deleteOccupation(id).subscribe(() => {
      this.getOccupations();
    });
  }
  
  editOccupation(id: any) {
    this.router.navigate(['/occupations/edit-occupation', id]);
  }
}
