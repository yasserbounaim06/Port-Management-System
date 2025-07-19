import { Component, OnInit } from '@angular/core';
import { Mission } from '../../models/missions.model';
import { MissionsService } from '../../services/missions.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [MissionsService], 
  styleUrls: ['./missions-list.css'] 
})
export class MissionsList implements OnInit {

  missions: Mission[] = [];

  constructor(private missionsService: MissionsService, private router: Router) { }

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    this.missionsService.getMissions().subscribe((data: Mission[]) => {
      this.missions = data;
    });
  }

  deleteMission(id: any) {
    this.missionsService.deleteMission(id).subscribe(() => {
      this.getMissions();
    });
  }
  
  editMission(id: any) {
    this.router.navigate(['/missions/edit-mission', id]);
  }
}
