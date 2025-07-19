import { Component, OnInit } from '@angular/core';
import { Navire } from '../../models/navires.model';
import { NaviresService } from '../../services/navires.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-navires-list',
  templateUrl: './navires-list.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
  providers: [NaviresService], 
  styleUrls: ['./navires-list.css'] 
})
export class NaviresList implements OnInit {

  navires: Navire[] = [];

  constructor(private naviresService: NaviresService, private router: Router) { }

  ngOnInit(): void {
    this.getNavires();
  }

  getNavires(): void {
    this.naviresService.getNavires().subscribe((data: Navire[]) => {
      this.navires = data;
    });
  }

  deleteNavire(matricule: any) {
    this.naviresService.deleteNavire(matricule).subscribe(() => {
      this.getNavires();
    });
  }
  
  editNavire(matricule: any) {
    this.router.navigate(['/navires/edit-navire', matricule]);
  }
}
